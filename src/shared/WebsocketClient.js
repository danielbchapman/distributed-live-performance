import { Web } from "@material-ui/icons"

var num = 1

class WebsocketClient {
  constructor(address, port, readyHandler) {
    this.address = address
    this.port = port
    this.ws = null
    this.doShutdown = false
    this.pingTimeout = null
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
    console.log(this.pingTimeout)
    clearTimeout(this.pingTimeout)
    if(!this.shutdownBool && this.ws) {
      this.ws.send('heartbeat')
      console.log(`Client Heartbeat # ${num}`)
      this.pingTimeout = setTimeout( () => {
        this.ws.close()
      }, 5000 + 1000) //expects response or it resurrects
      console.log(`NewTimeout->${this.pingTimeout}`)
    }
  }

  connect(onReady) {
    if(this.ws) {
      try{
          this.ws.close()
      } catch (e) {
        console.log('[WebsocketClient]::Closing Socket before opening')
        console.log(e)
      }
    }

    this.shutdownBool = false
    this.ws = new WebSocket(`ws://${this.address}:${this.port}`)
    const client = this.ws

    client.onopen = (event) => {
      this.heartbeat()
      client.send(`Hi I connected\n->"${JSON.stringify(event, null, 2)}"`)
      if(onReady) {
        onReady()
      }
    }

    client.onclose = (event) => {
      if(!this.doShutdown) {
        console.log('[WebsocketClient] Socket Closing Unexpectedly. Attempting Reconnect')
        setTimeout(()=>{this.connect()}, 1000)
      } else {
        console.log('[WebsocketClient] Socket Closing As Requested')
      }
    }

    client.onerror = (err) => {
      console.log('[WebsocketClient] OnError, Closing.')
      console.log(err)
    }

    client.addEventListener('message', this.handleMessage)
  }

  handleMessage(event) {
    console.log(`Message from server: ${event.data}`)
  }

  shutdown() {
    this.doShutdown = true
    console.log(`[WebsocketClient] Shutting down socket->${JSON.stringify(this.ws)}`)
    if(this.ws) {
      this.ws.close()
    }
  }
}

export default WebsocketClient