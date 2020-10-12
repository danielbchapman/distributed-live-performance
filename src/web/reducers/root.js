import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootCreate = (history) => combineReducers({
  //other reducers eventually
  router: connectRouter(history)
})
export default rootCreate