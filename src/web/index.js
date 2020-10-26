import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import rootCreate from './reducers/root'
import Home from './App'
import Cues from './cues'
import About from './about'
import Setup from './setup'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()


//Simple verbose logger
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const store = createStore( 
  rootCreate(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger,
      thunk,
    )
  )
)

window.REDUX_STORE = store
window.WEBSOCKET_CLIENT = null 

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/cues" component={Cues} />
        <Route path="/setup" component={Setup} />
        <Route path="/" component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-entry')
)
