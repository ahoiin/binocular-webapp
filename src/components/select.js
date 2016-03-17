import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './react-select.scss'

import d3_request from 'd3-request'
import dataPath_ra from "file!../data/data_ra.json"
import dataPath_rc from "file!../data/data_rc.json"

class SelectBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	itemActive: 0
    }
  }

  _loadJson(path) {
	   var that = this;
	    // get seasons data for overview
	    d3_request.json('data/'+path+'/data_ra.json', function (error, result) {
	      if (error) throw error;
	        d3_request.json('data/'+path+'/data_rc.json', function (error2, result2) {
	          if (error2) throw error2;
	          console.log(result);
	          that.props.loadData(result, result2);
	        })
	    })
   }

  componentDidMount = () => {
  	this._loadJson(this.props.app.select.data[0])
  }

_selectChange(selected) {
	this._loadJson( selected.label )
	// this.setState({
	// 	itemActive: selected.value
	// });
}


// -------------------------- render

  render() {

    var selectItems_ = this.props.app.select.data;
    var selectItems = selectItems_.map((d,i) => ( {"value": i, "label": d} ))

    return (
      <div id="selectBoxx" >
          <Select
                name="form-field-item"
                options={selectItems}
                value={ this.state.itemActive }
                onChange={ this._selectChange.bind(this) }
                clearable={false}
                placeholder="Select Dataset" />
      </div>

    )
  }
}



 // componentWillReceiveProps(nextProps){
 //  }



 //  componentDidMount() {
 //  }


SelectBox.propTypes = {

};

SelectBox.defaultProps = {

};



export default SelectBox;
