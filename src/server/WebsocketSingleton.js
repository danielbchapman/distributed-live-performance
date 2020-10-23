
const BAD_SECURITY_KEY_ADMIN = 'TEST_ADMIN'
const BAD_SECURITY_KEY_USER = 'TEST_USER'
const BAD_SECURITY_KEY_CLIENT = 'TEST_CLIENT'


class WebsocketSingleton {
  constructor(wss){
    this.wss = wss
    //Some rehydrate from a DB locally or something
  }

  sendAll(type, json) {
    this.wss.clients.forEach( client => {
      if(!client) {
        return
      }

      client.send(JSON.stringify({
        type: type,
        json: json
      }))
    })
  }
  /**
   * @param {JSON} message 
   * @return ROLE (NONE for invalid)
   */
  authenticate(message) {
    if(message && message.auth) {
      //FIXME --we need to add some real authentication to this, maybe JWT or something
      switch(message.auth.key) {
        case BAD_SECURITY_KEY_ADMIN:
          return ROLES.ADMIN
        
        case BAD_SECURITY_KEY_CLIENT:
          return ROLES.CLIENT

        case BAD_SECURITY_KEY_USER:
          return ROLES.USER

        default:          
          return ROLES.NONE
      }
    }

    return ROLES.NONE
  }

  // /**
  //  * 
  //  * @param {JSON} message the message object
  //  * @return true if processed, else false
  //  */
  // process(message) {
  //   // try {
  //   //   const role = this.authenticate(message)
  //   //   if(role < 1) {
  //   //     console.log('MESSAGE FAILED AUTHENTICATION')
  //   //     return false
  //   //   }
  //   // } catch(e) {
  //   //   console.log('Unable to process message')
  //   //   console.log(e)
  //   //   return false
  //   // } 
  //   let message = JSON.parse(message)
  // }
}
export default WebsocketSingleton