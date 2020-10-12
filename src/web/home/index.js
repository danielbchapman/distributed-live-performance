import React from 'react'
import Layout from './../components/Layout'

import {
  Button,
} from '@material-ui/core'
class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <h1>Home Page</h1>
        <Button
          variant='contained'
          color='primary'
          onClick={ x => alert("x")}
        >
          Alert!
        </Button>
        <p>Yo!</p>
      </Layout>
    )
  }
}

export default HomePage