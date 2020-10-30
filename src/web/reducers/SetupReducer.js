
export const EDIT_PROPERTY = 'SETUP_EDIT_PROPERTY'
export const RESET_TO_DEFAULT = 'SETUP_RESET_TO_DEFAULT'

import {
  uploadStateToServer
} from './../../shared/SharedActions'
const INITIAL_STATE = {
  show: 'Default Show',
  remoteServer: 'http://localhost:9000',
}

export const editProperty = (prop, value) => {
  if(!prop) {
    return
  }
  
  return dispatch => {
    dispatch({
      type: EDIT_PROPERTY,
      prop: prop,
      value: value,
    })
  }
}

/**
 * Pushes the state to the server forcing a replication
 */
export const saveToServer = () => {
  return (dispatch, getState) => {
    const state = getState();
    const server = state.setup.remoteServer
    uploadStateToServer(server, JSON.stringify(state))
      .then(result => {
        alert('upload completed...' + JSON.stringify(result))
      }).catch(err=>{
        alert('FAILURE: ' + err)
        console.log(err)
      })
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EDIT_PROPERTY: {
      const {prop, value} = action
      if(prop) {
        const copy = {...state}
        copy[prop] = value

        return copy
      }
    }

    case RESET_TO_DEFAULT: {
      return INITIAL_STATE
    }

    default:
      return state
  }
}