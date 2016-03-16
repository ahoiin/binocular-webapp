import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import app from './app.js';


// const rootReducer = combineReducers(Object.assign({}, {
//   app: app
// }, { routing: routeReducer }
// ))
const rootReducer = combineReducers(Object.assign({}, {
  app: app
}, { routing: routerReducer }
))


export default rootReducer;