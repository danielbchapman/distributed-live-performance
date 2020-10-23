import React from 'react'
import Layout from './../components/Layout'
import {
  Button
} from '@material-ui/core'

import WebsocketClient from './../../shared/WebsocketClient'
const SERVER = 'http://localhost:9000'
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

  replicate() {
    fetch(SERVER + '/api/replicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: "{}"      
      }
    })
    .then(res => {})
    .catch(error => {
      alert(error)
    })
  }

  disconnect() {
    if(this.state.client) {
      this.state.client.shutdown()
      this.setState({
        ready: false,
      })
    }
  }

  setup(address, port) {
    if(!this.state.client) {
      const client = new WebsocketClient('127.0.0.1', 9001, 'TEST_USER', 'TEST_PASSWORD', window.REDUX_STORE)
      
      this.setState({
        client: client
      })
    }
  }

  websocketConnect() {
    if(!this.state.client) {
      alert('SETUP INCOMPLETE')
    } else {
      const onConnect = ()=>{
        this.setState({
          ready: true
        })
        this.state.client.send(`I'm a test ${Date.now()}`)
      }
      this.state.client.connect(onConnect)
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

        <Button
          variant='contained'
          onClick={x => {
            this.replicate()
          }}
        >
          REPLICATE
        </Button>

        <div>
          { connected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </Layout>
    )
  }
}

export default Cues