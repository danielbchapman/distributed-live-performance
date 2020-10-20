import E131 from './e131Sender'
import ArtNet from './artnetSender'

let localE131 = null
let localArtnet = null
let interfaceAddress = '0.0.0.0'

export const setInterface = (address, useE131 = true, useArtNet = true) => {
  ArtNet.start(interfaceAddress)
  E131.start(interfaceAddress)

  localE131 = useE131
  localArtnet = useArtNet
}

export const setEnableArtNet = (bool) => {
  if(!bool && localArtnet) {
    ArtNet.shutdown()
  }
}

export const setEnableE131 = (bool) => {
  if(!bool) {
    E131.shutdown()
  }
}

/**
 * 
 * @param {*} universe the universe starting at 0x01 This is corrected to zero based indexes for ArtNet
 * @param {Array<byte>} an array of bytes, max length 512
 * @returns {boolean} true if sent, false if not sent
 */
export const send = (universe = 1, packet = []) => {
  if(localArtnet) {
    //send artnet
  }

  if(localE131) {
    E131.send(universe, packet)
  }

  if(!localE131 && !localArtnet) {
    return false
  }

  return true
}
export const sendE131 = E131.send
export const sendArtNet = ArtNet.send

export const log = (to) => {
  const status = `LOG NOT IMPLEMENTED`
  if(to) {
    to(status)
  } else {
    console.log(status)
  }
}

export const shutdown = () => {
  E131.shutdown()
  ArtNet.shutdown()
}
export default {
  setInterface,
  send,
  sendE131,
  sendArtNet,
  shutdown,
  log,
}