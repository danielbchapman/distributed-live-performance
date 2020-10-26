import React from 'react'
import {
  Button
} from '@material-ui/core'

class RemoteConnection extends React.Component {

  render() {
    return (
      <footer 
        style={{
          flex: 0,
          minHeight: 48,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: window.theme.palette.primary.dark,
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