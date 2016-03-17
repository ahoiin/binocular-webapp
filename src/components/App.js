import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/app'
import Network from './network/index'

import SelectBox from "./select"

class App extends Component {


  render () {
    const { ...props } = this.props

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight|| e.clientHeight|| g.clientHeight;


    return (
      <div {...props}>

        <div className="header">
          <h1>
            <div className="head">Binoculars</div>
            <div className="subhead">– A socio-semantic visualization of actor-topic networks</div>
          </h1>
          <SelectBox {...props} />
        </div>

        <div className="content">
          <div id="container_ra" className="col">
            <Network
              data={ this.props.app.data_ra }
              type="ra"
              width={ width/2 }
              height={ height }
              {...props}
            />
          </div>

          <div id="divider"></div>

          <div id="container_rc" className="col" style={{ left:width/2 }}>
            <Network
              data={ this.props.app.data_rc }
              type="rc"
              width={ width/2 }
              height={ height }
              {...props}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default App

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)


