import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './react-select.scss'
import { browserHistory } from 'react-router'

import d3_request from 'd3-request'
import dataPath_ra from "file!../data/data_ra.json"
import dataPath_rc from "file!../data/data_rc.json"

class SelectBox extends Component {


  _loadJson(path, id) {
	   var that = this;
	    // get seasons data for overview
	    d3_request.json('../data/'+path+'/data_ra.json', function (error, result) {
	      if (error) throw error;
	        d3_request.json('../data/'+path+'/data_rc.json', function (error2, result2) {
	          if (error2) throw error2;
	          that.props.loadData(result, result2, parseInt(id));
	        })
	    })
   }

  componentDidMount = () => {
    var id = (typeof this.props.params.dataset != 'undefined') ? this.props.params.dataset : this.props.app.select.active
    this._loadJson( this.props.app.select.data[id], id )
    browserHistory.push("/data/"+id)
  }

 componentWillReceiveProps(nextProps){
    if(this.props.params.dataset != nextProps.params.dataset ) {
      this._loadJson( this.props.app.select.data[nextProps.params.dataset], nextProps.params.dataset )
    }
  }

  _selectChange(selected) {
    browserHistory.push("/data/"+selected.value)
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
                value={ this.props.app.select.active }
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
