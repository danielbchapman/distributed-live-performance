
export const send = (universe, packet = []) => {
  console.log(`SENDING ${universe}: ${packet.length}`)
}

export const shutdown = () => {

}
export const start = (port) => {
  console.log('no artnet support')
}

export default {
  send,
  start,
  shutdown,
}