const SOCKET_PORT = 53007
const SERVER_PORT = 9001
console.log('----------starting node server on 9001, websockets on 53007')
import express from 'express'
import fs from 'fs-extra'
import http from 'http'
import ws from 'ws'

const app = express()

app.get('/', (req, res) => {
  res.send('Express Server Runnning....')
})

const server = app.listen(9001)

const wsServer = new ws.Server({ noServer: true})

const CLIENTS = {}

function heartbeat() {
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
  }) //fire every 30 seconds 
}, 5000)

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
  client.on('message', message => console.log(message) )
  client.send('server-message')
})

wsServer.on('message', socket => {
  console.log(JSON.stringify(socket, null, 2))
  wsServer.send()
})

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request)
  })
})