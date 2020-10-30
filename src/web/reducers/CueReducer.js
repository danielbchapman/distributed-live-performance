export const ADD_CUE = 'CUES_ADD_CUE'
export const REMOVE_CUE = 'CUES_ADD_CUE'
export const REPOSITION_CUE = 'CUES_REPOSITION_CUE'
export const UPDATE_CUE = 'CUES_UPDATE_CUE'

import {
  updateLevel
} from './../../shared/SharedActions'

const INITIAL_STATE = {
  cues: [],
  currentCue: -1,
}

export default (state = INITIAL_STATE, action) => {
  return state
}