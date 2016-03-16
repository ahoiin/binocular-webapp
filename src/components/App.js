import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/app'
import Network from './network/index'
import d3_request from 'd3-request'
import dataPath from "file!../data/data_ra.json"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount = () => {

    var that = this;
    // get seasons data for overview
    d3_request.json(dataPath, function (error, result) {
      if (error) throw error;
      that.setState({data: result});
    })

  }


  render () {
    const { ...props } = this.props

    return (
      <div {...props}>

        <Network
          data={ this.state.data } {...props}
        />

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


