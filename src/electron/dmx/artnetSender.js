
let artnetClass = require('artnet')
let artnet = null

export const send = (universe, packet = []) => {
  if(artnet) {
    console.log(`SENDING ${universe}: ${packet.length}`)
    artnet.set(universe, 1, packet)
  } else {
    console.log(`SENDING ${universe}: ${packet.length}`)
  }
}

export const shutdown = () => {
  if(artnet) {
    artnet.close()
    artnet = null
  }
}
export const start = (address) => {
  shutdown()
  if(address) {
    artnet = artnetClass({
      iface: address
    })
  } else {
    artnet = artnetClass()
  }
  //It should bind to 0.0.0.0 by default
  
}

export default {
  send,
  start,
  shutdown,
}