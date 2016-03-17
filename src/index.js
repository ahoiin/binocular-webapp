/**
 * This target is published to the root of the `gh-pages` branch.
 * @flow
 */
import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import initialState from './store/initialState'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import './index.scss'
import App from "./components/App";


const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)

let div = document.createElement('div')
document.body.appendChild(div)


// Provider = connects our component tree to a Redux store, enabling us to make the mappings for individual components later
render(
  <Provider store={ store }>
	<Router history={history}>
	    <Route path="/" component={App}>
	      <IndexRoute component={App}/>
	      <Route path="/data/:dataset" component={App} />
	    </Route>
    </Router>
  </Provider>,
  div
)



