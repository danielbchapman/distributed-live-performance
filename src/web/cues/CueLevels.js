import React from 'react'
import { connect } from 'react-redux'

class CueLevels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cue: {...props.cue}
    }
  }

  render(){
    return <div>Cue Levels</div>
  }


}
export default connect(s=>{
  return {}
})(CueLevels)