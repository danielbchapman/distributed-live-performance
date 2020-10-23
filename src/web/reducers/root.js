import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


import CueReducer from './CueReducer'
import SetupReducer from './SetupReducer'
import WebsocketReducer from './WebsocketReducer'

const rootCreate = (history) => combineReducers({
  //other reducers eventually
  cues: CueReducer,
  router: connectRouter(history),
  setup: SetupReducer,
  websockets: WebsocketReducer,
})
export default rootCreate