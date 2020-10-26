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

window.theme = theme

const styleOverride = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
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

const listItemStyle = {
  display: 'inline'
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
          <nav
            style={{
              flex:0,
              minHeight: 36,
              display: 'flex',
              flexDirection: 'row',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 6,
              paddingBottom: 4,
              backgroundColor: window.theme.palette.primary.dark,
            }}
        >
            { navLink('/', 'Home', this.props.dispatch) }
            <div
              style={{
                flex: 1,
              }}
            >
            </div>
            { navLink('/cues', 'Cues', this.props.dispatch) }
            { navLink('/setup', 'Setup', this.props.dispatch) }
            { navLink('/about', 'About', this.props.dispatch) }
          </nav>
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
            }}
            className="main-content"
          >
            { children }
          </div>

          <RemoteConnection />
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