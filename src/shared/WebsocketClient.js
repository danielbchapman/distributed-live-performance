import { Web } from "@material-ui/icons"

var num = 1

class WebsocketClient {
  constructor(address, port, user, secret, reduxStore) {
    this.address = address
    this.port = port
    this.user = user
    //FIXME we need to hash this
    this.secret = secret
    this.ws = null
    this.doShutdown = false
    this.pingTimeout = null
    this.websocketUUID = null
    this.reduxStore = reduxStore
  }

  ready() {
    console.log('[WebsocketClient::ready]')
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }

  send(jsonObj) {
    const key = this.secret
    if(this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send({
        payload: jsonObj,
        token: key, //FIXME--this is a bad auth token, we need something better
      })
    }
  }

  heartbeat() {
    //console.log(this.pingTimeout)
    clearTimeout(this.pingTimeout)
    if(!this.doShutdown && this.ws) {
      this.ws.send('heartbeat')
      //console.log(`Client Heartbeat # ${num}`)
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
      this.send(JSON.stringify({
        'test': `Hi I connected\n->"${JSON.stringify(event, null, 2)}"`
      }))
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

    client.addEventListener('message', (event)=>{ this.handleMessage(event) })
  }

  handleMessage(event) {
    console.log(`Message from server: ${event.data}`)
    if(event.data == 'heartbeat') {
      clearTimeout(this.pingTimeout)
      setTimeout(()=>{this.heartbeat()}, 5000) //wait 5000 and resend
      return
    } else {
      try {
        let json = JSON.parse(event.data)
        switch(json.type) {
          case 'replicate': 
            this.doReplicate()
            break;
          default: 
            console.log(`Unknown type: ${json.type}`)
            console.log(json)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  doReplicate() {
    alert('DO REPLICATE')
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