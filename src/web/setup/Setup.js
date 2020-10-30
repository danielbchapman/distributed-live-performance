import React from 'react'
import { connect } from 'react-redux'
import Layout from './../components/Layout'

import {
  TextField,
  Button,
} from '@material-ui/core'

import {
 editProperty,
 saveToServer,
} from './../reducers/SetupReducer'

class Setup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edits: {}
    }
  }

  componentDidMount() {
    this.setState({
      edits: {
        show: this.props.show,
        server: this.props.server,
        port: this.props.port || '9000',
      }
    })
  }

  editText(field, newValue) {
    const copy = {...this.state.edits}
    copy[field] = newValue
    this.setState({
      edits: copy
    })
  }

  commitValue(field) {
    this.props.dispatch( editProperty(field, this.state.edits[field]) )
  }

  render() {
    const renderTextField = (prop, label, help) => {
      return (
        <TextField
            value={this.state.edits[prop]}
            label={label}
            helperText={help || null}
            onBlur={e => {
              this.commitValue(prop)
            }}
            onChange={e => {
             this.editText(prop, e.target.value)
            }}
          />
      )
    }
    return (
      <Layout>
        <h1>SETUP</h1>
        <div>
          { renderTextField('server', 'Remote Server', 'ex: http://127.0.0.1:9000')}
        </div>
        <Button
          variant='contained'
          color='secondary'
          onClick={e => {
            this.props.dispatch(saveToServer())
          }}
        >
          Save
        </Button>
      </Layout>
    )
  }
}

export default connect(s => {
  return s.setup || {}
})(Setup)