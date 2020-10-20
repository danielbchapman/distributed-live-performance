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
wsServer.on('connection', socket => {
  socket.on('message', message => console.log(message) )
  socket.send('server-message')
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