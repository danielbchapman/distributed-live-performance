import React from 'react'
import Layout from './../components/Layout'
import {
  Button
} from '@material-ui/core'

import WebsocketClient from './../../shared/WebsocketClient'

class Cues extends React.Component {

  constructor(props) {
    super(props)
    this.didConnect = false
    this.client = null

    this.state = {
      ready: false
    }
  }
  
  disconnect() {
    if(this.client) {
      this.client.close()
      this.client = null
    }
  }

  websocketConnect() {
    if(!this.client) {
      this.client = new WebsocketClient('127.0.0.1', 9001, (ready) => {
        this.setState({ready: ready})
      })
      this.client.connect()
    }
    this.client.test(`I'm a test ${Date.now()}`)

    // this.client.
    // if(!this.didConnect) {
    //   this.client = new WebSocket('ws://localhost:9001')
    //   let client = this.client

    //   client.addEventListener('open', event => {
    //     client.send('Hi I connected')
    //   })

    //   client.addEventListener('message', event => {
    //     alert(`Message from server: ${event.data}`)
    //   })

    //   this.didConnect = true
    // } else {
    //   this.client.send('Yo Yo Yo.')
    // }
  }

  render() {
    const connected = this.state.ready
    return (
      <Layout>
        <h1>CUE SHEET</h1>
        <Button
          variant='contained'
          onClick={x => {
            this.websocketConnect()
          }}
        >
          Say hi to the server
        </Button>

        <Button
          variant='contained'
          onClick={x => {
            this.disconnect()
          }}
        >
          Disconnect
        </Button>

        <div>
          { connected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </Layout>
    )
  }
}

export default Cues