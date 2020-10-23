
export const EDIT_PROPERTY = 'SETUP_EDIT_PROPERTY'
export const RESET_TO_DEFAULT = 'SETUP_RESET_TO_DEFAULT'

const INITIAL_STATE = {
  show: 'Default Show',
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