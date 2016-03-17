import React, { Component, PropTypes } from 'react'
import d3 from 'd3'
import _ from 'lodash'


class NetworkNodes extends Component {

  _showItem(d) {
    let { nodes, links } = this.props
    let selected_ids = _.clone(this.props.selected_ids)
    var selected_ids_others = {}
    var selected_ids_ra = []
    var selected_ids_rc = []

    // see if id has already been selected
    var idx = _.indexOf(selected_ids, d.id );

    if(idx == -1) {
      // add id to array
      selected_ids.push(d.id);

      //get others items of selected item
      let selected_ids_obj = nodes.filter(datum => d.id == datum.id)[0]
      for(var k in selected_ids_obj.ra) selected_ids_ra.push(parseInt(k))
      for(var k in selected_ids_obj.rc) selected_ids_rc.push(parseInt(k))

      var selected_ids_in = []
      links.map(function(e,i) {
        if(e.target == d.id) selected_ids_in.push(e.source);
      });
      if(this.props.type == "ra") selected_ids_ra = _.union(selected_ids_ra, selected_ids_in);
      else selected_ids_rc = _.union(selected_ids_rc, selected_ids_in);
      selected_ids_others = { ra: selected_ids_ra, rc: selected_ids_rc }

    }
    else {
      // remove id to selected ids for show/hide
      selected_ids.splice(idx, 1);
    }

    this.props.interaction(this.props.type, d.id, selected_ids, selected_ids_others);
  }


_mouseOver(d) {
  if(!this.props.clicked) this._showItem(d)
}

_mouseClick(d) {
  let clicked = !this.props.clicked ? d.id : (this.props.clicked == d.id ? null : this.props.clicked)
  this.props.clickedToggle(clicked)
}


_mouseOut() {
  if(!this.props.clicked) {
    let selected_ids = []
    let selected_ids_others = { ra: [], rc: []}
    this.props.interaction(this.props.type, null, selected_ids, selected_ids_others);
  }

}



	render() {
    let { nodes, selected_ids, selected_ids_others, hover } = this.props
    var that = this;

		return (
			   <g>
            { nodes.map(function(d, i) {
                var status = selected_ids.length > 0 ? (_.indexOf(selected_ids, d.id ) >= 0 ? 'show root' : 'hide' ) : ''
                if(status!='show root' && selected_ids_others.length > 0) status = selected_ids_others.length > 0 ? (_.indexOf(selected_ids_others, d.id ) >= 0 || _.indexOf(selected_ids_others, d.id ) >= 0 ? 'show' : 'hide' ) : status
                if((status=='') && hover) status = 'hide'

                return (
                  <g className={ "node ra ra_id_" + i + " " + status }
                    key={ i }
                    onMouseOver={ that._mouseOver.bind(that,d) }
                    onMouseOut={ that._mouseOut.bind(that) }
                    onClick={ that._mouseClick.bind(that,d) }
                    transform={ `translate( ${d.x} , ${d.y} )` } >
                    <text
                      dx="0"
                      dy="0.35"
                      style={{ "fontSize": "12", "textAnchor": "middle" }} >

                      {d.name}

                    </text>
                 </g>
                )
            })}
          </g>
		)
	}
}


NetworkNodes.propTypes = {

};

NetworkNodes.defaultProps = {

};



export default NetworkNodes;