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

    this.state = {
      ready: false,
      client: null,
    }
  }
  
  componentDidMount() {
    this.setup()
  }

  disconnect() {
    if(this.state.client) {
      this.state.client.shutdown()
    }
  }

  setup(address, port) {
    if(!this.state.client) {
      const client = new WebsocketClient('127.0.0.1', 9001)
      client.onConnectHandler = (ready) => {
        this.setState({ready: ready})
        client.test(`I'm a test ${Date.now()}`)
      }

      this.setState({
        client: client
      })
    }
  }

  websocketConnect() {
    if(!this.state.client) {
      alert('SETUP INCOMPLETE')
    } else {
      this.state.client.connect()
    }
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