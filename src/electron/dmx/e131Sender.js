
const e131 = require('e131')
let client = null

export const start = (address = '0.0.0.0') => {
  client = new e131.Client(address)
}

export const send = (universe = 1, packet = []) => {
  if(client && packet && packet.length) {
    const pak = client.createPacket(packet.length)
    pak.setSourceName('DLP e1.31')
    pak.setUniverse(universe)
    pak.setOption(pak.Options.PREVIEW, true)
    pak.setPriority(packet.DEFAULT_PRIORITY)
    
    const slots = pak.getSlotsData()

    for(let i = 0; i < packet.length; i++) {
      slots[i] = packet[i] & 0xFF //force 255
      console.log(`PACKET ${i} -> ${slots[i]} [${packet[i]}]`)
    }

    client.send(pak)
  } else {
    console.log(`[e131::send] [WARNING] No e131 client enabled`)
  }
}

export const shutdown = () => {
  client = null
}
export default {
  send,
  start,
  shutdown,
}