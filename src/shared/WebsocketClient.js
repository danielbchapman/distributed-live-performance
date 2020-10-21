import { SignalCellularNullTwoTone } from "@material-ui/icons"

var num = 1

class WebsocketClient {
  constructor(address, port, readyHandler) {
    this.address = address
    this.port = port
    this.ws = null
    this.heatbeatTimeout = null
    this.heartbeatInterval = null
    this.shutdown = false
    this.onConnectHandler = readyHandler
    this.handleClose.bind(this)
    this.connect.bind(this)

  }

  ready() {
    console.log('[WebsocketClient::ready]')
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }

  test(message) {
    if(this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    }
  }

  heartbeat() {
    clearTimeout(this.heatbeatTimeout)
    console.log(`Client Heartbeat # ${num}`)
    this.heatbeatTimeout = setTimeout( () => {
      this.close()
      this.connect()
    }, 5000 + 1000)
  }

  connect() {
    clearTimeout(this.heatbeatTimeout)
    clearInterval(this.heartbeatInterval)

    this.shutdown = false
    this.ws = new WebSocket(`ws://${this.address}:${this.port}`)
    const client = this.ws

    client.addEventListener('open', event => {
      client.send(`Hi I connected\n->"${JSON.stringify(event, null, 2)}"`)
      this.heartbeat()
      this.heartbeatInterval = setInterval(()=>{
        client.send('--heartbeat--')
      }, 1000)

      if(this.onConnectHandler) {
        this.onConnectHandler(true)
      }
    })

    client.addEventListener('message', this.handleMessage)
    client.addEventListener('close', (evt) => { this.handleClose(evt) })
    client.addEventListener('--heartbeat--', event => {
      this.heartbeat()
    })
  }

  handleMessage(event) {
    console.log(`Message from server: ${event.data}`)
  }

  close() {
    this.shutdown = true
    this.handleClose()
  }

  handleClose(event) {
    if(this.onConnectHandler) {
      this.onConnectHandler(false)
    }
    if(this.ws) {
      console.log(`[WebsocketClient::handleClose] ${this.ws.readyState} 0-CONNECTING 1-OPEN 2-CLOSING 3-CLOSED`)
    }
    
    if(!this.shutdown) {
      this.ws = null
      clearTimeout(this.heatbeatTimeout)
      clearInterval(this.heartbeatInterval)
      this.connect()
    } else {
      this.ws = null
      this.shutdown = false
      clearTimeout(this.heatbeatTimeout)
      clearInterval(this.heartbeatInterval)

      console.log(`[WebsocketClient] Shutting Down`)
    }
  }

  shutdown() {
    if(this.ws) {
      this.shutdown = true
      this.ws.close()
    }
  }
}

export default WebsocketClient