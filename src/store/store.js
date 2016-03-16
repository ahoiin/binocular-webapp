import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import { syncHistoryWithStore, routerReducer, syncHistory , routerMiddleware} from 'react-router-redux'
import { browserHistory } from 'react-router'
import initialStates from './initialState'


import _ from 'lodash'


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

// middleware is a third-party extension point between dispatching an action, and the moment it reaches the reducer
// middleware hits before an action hits the store
export default function configureStore(initialState = {}) {

// const middleware = syncHistoryWithStore(browserHistory, store)
  // const store = createStore(
  //   combineReducers({
  //     ...rootReducer,
  //     initialState,
  //     routing: routerReducer
  //   })
  // )
  // const middleware = syncHistory(browserHistory)
  //  const enhancer = compose(
  //   applyMiddleware(thunk,middleware), //, middleware
  //   DevTools.instrument()
  // )

  // const store = createStore(rootReducer, initialState, enhancer)

  // const middleware = syncHistoryWithStore(browserHistory, store)
    // const store = createStoreWithMiddleware(rootReducer, initialState)

  const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
    // Required! Enable Redux DevTools with the monitors you chose
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
// const reducer = combineReducers({
//   ...reducers,
//   routing: routerReducer
// })

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

// const store = createStore(
//   reducer,
//   DevTools.instrument()
// )
  const store = createStore(rootReducer, initialState)


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}




