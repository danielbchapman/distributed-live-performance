
import express from 'express'
import fs from 'fs-extra'
import http from 'http'
import ws from 'ws'
import RestAPI from './RestAPI'
import WebsocketSingleton from './WebsocketSingleton'

let _express = null
let _wss = null

export const EXPRESS_SINGLETON = ()=> { return _express }
export const WEBSOCKET_SINGLETON = ()=> { return _wss }

export default (socketPort, apiPort, secret, file) => {
  console.log(`----------starting node server on ${apiPort}, websockets on ${socketPort}`)
  console.log(`----------secret ${secret}`)
  console.log(`----------file ${file}`)
  const app = express()

  //Setup processing
  app.use(express.urlencoded())
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Express Server Runnning....')
  })
  
  const server = app.listen(9001)
  
  const wsServer = new ws.Server({ noServer: true})
  
  const CLIENTS = {}
  
  function heartbeat() {
    //console.log(`PONG ${JSON.stringify(this, null, 2)}`)
    this.isAlive = true
  }
  
  const noOp = () => {}
  
  const interval = setInterval( () => {
    wsServer.clients.forEach( client => {
      console.log('--SERVER HEARTBEAT')
      if(!client) {
        return
      }
      if(client.isAlive === false) {
        console.log('TERMINATING CLIENT')
        return client.terminate()
      }
      client.isAlive = false;
      client.ping(noOp)
    }) 
  }, 5000) //FIXME - fire every 30 seconds 
  
  wsServer.on('disconnect', function close(){
    console.log(`DISCONNECTED ${JSON.stringify(this, null, 2)}` )
  })
  
  wsServer.on('connection', (client) => {
    client.isAlive = true
    client.on('pong', heartbeat)
    client.on('close', () => {
      console.log('CLIENT CLOSE')
      client.isAlive = false
      client.terminate()
    })
    client.on('message', message => {
      
      if(message == 'heartbeat') {
        client.send('heartbeat')
      }
      console.log(JSON.stringify(message))
    } )
    client.send('server-message--startup--placeholder')
  })
  
  wsServer.on('message', message => {
    if(message && message.type) {
  
    }
    console.log(JSON.stringify(message, null, 2))
    wsServer.send()
  })
  
  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request)
    })
  })

  RestAPI(app, wsServer, file)

  //Setup Singletons
  _wss = new WebsocketSingleton(wsServer)
  _express = app

  return app
}
