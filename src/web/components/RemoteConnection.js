import React from 'react'
import {
  Button
} from '@material-ui/core'

class RemoteConnection extends React.Component {

  render() {
    return (
      <footer 
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'rgb(48,0,48)',
        }}
      >
        <div
          style={{
            flex: 0,
            paddingLeft: 24,
            minWidth: 400,
          }}
        >
          Not Connected to Remote
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
        </div>
        <div
          style={{
            flex: 0,
            paddingRight: 24
          }}
        >
          <Button>Connect</Button>
        </div>
      </footer>
    )
  }
}

export default RemoteConnection