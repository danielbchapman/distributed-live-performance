import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  Button
} from '@material-ui/core'
import RemoteConnection from './RemoteConnection'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

const styleOverride = {
  
}

const navLink = (to, text, dispatch) => {
  return (
    <Button
      onClick={x => {
        console.log(`pushing ${to}`)
        dispatch( push(to) )
      }}
    >
      {text}
    </Button>
  )
}

class Layout extends React.Component {
  render() {
    const children = this.props.children
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div 
          className="react-container"
          style={styleOverride}
        >
          <nav>
            <ul>
              <li>{ navLink('/', 'Home', this.props.dispatch) }</li>
              <li>{ navLink('/cues', 'Cues', this.props.dispatch) }</li>
              <li>{ navLink('/setup', 'Setup', this.props.dispatch) }</li>
              <li>{ navLink('/about', 'About', this.props.dispatch) }</li>
            </ul>
          </nav>
          <div className="main-content">
            { children }
          </div>

          <RemoteConnection />
          <div>
            DEBUG
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

export default connect(
  s => {
    return {}
  }
)( Layout )