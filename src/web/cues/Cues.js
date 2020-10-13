import React from 'react'
import Layout from './../components/Layout'
import {
  Button
} from '@material-ui/core'

class Cues extends React.Component {

  constructor(props) {
    super(props)
    this.didConnect = false
    this.client = null
  }
  websocketConnect() {
    if(!this.didConnect) {
      this.client = new WebSocket('ws://localhost:9001')
      let client = this.client

      client.addEventListener('open', event => {
        client.send('Hi I connected')
      })

      client.addEventListener('message', event => {
        alert(`Message from server: ${event.data}`)
      })

      this.didConnect = true
    } else {
      this.client.send('Yo Yo Yo.')
    }
  }

  render() {
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
      </Layout>
    )
  }
}

export default Cues