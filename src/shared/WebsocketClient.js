
var num = 1

class WebsocketClient {
  constructor(address, port, readyHandler) {
    this.address = address
    this.port = port
    this.ws = null
    this.heartbeatTimeout = null
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
    clearTimeout(this.heartbeatTimeout)
    if(!this.shutdown) {
      console.log(`Client Heartbeat # ${num}`)
      this.heartbeatTimeout = setTimeout( () => {
        this.close()
        this.connect()
      }, 5000 + 1000)
    }
  }

  connect() {
    clearTimeout(this.heartbeatTimeout)

    this.shutdown = false
    this.ws = new WebSocket(`ws://${this.address}:${this.port}`)
    const client = this.ws

    client.addEventListener('open', event => {
      client.send(`Hi I connected\n->"${JSON.stringify(event, null, 2)}"`)
      this.heartbeat()

      if(this.onConnectHandler) {
        this.onConnectHandler(true)
      }
    })

    client.addEventListener('message', this.handleMessage)
    client.addEventListener('close', (evt) => { this.handleClose(evt) })
  }

  handleMessage(event) {
    console.log(`Message from server: ${event.data}`)
  }

  close() {
    this.shutdown = true
    clearTimeout(this.heartbeatTimeout)
    this.handleClose()
  }

  handleClose(event) {
    if(this.onConnectHandler) {
      this.onConnectHandler(false)
    }
    clearTimeout(this.heartbeatTimeout)
    if(this.ws) {
      console.log(`[WebsocketClient::handleClose] ${this.ws.readyState} 0-CONNECTING 1-OPEN 2-CLOSING 3-CLOSED`)
    }
    
    if(!this.shutdown) {
      clearTimeout(this.heartbeatTimeout)
      try {
        this.ws.onclose = ()=>{}
        this.ws.close()
      } catch (e) {
        console.log(e)
      }
      this.ws = null
      this.connect()
    } else {
      clearTimeout(this.heartbeatTimeout)
      try {
        this.ws.onclose = ()=>{}
        this.ws.close()
      } catch (e) {
        console.log(e)
      }
      this.ws = null
      this.shutdown = false
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