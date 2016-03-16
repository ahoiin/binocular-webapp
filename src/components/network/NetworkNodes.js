import React, { Component, PropTypes } from 'react'
import d3 from 'd3'
import _ from 'lodash'


class NetworkNodes extends Component {




_mouseOver(d) {

  let selected_ids = _.clone(this.props.app.selected_ids)
  let { nodes, links } = this.props.app
  var selected_ids_obj = {}
  var selected_ids_others = {}

  // see if id has already been selected
  var idx = _.indexOf(selected_ids, d.id );

  if(idx == -1) {
     // if shiftkey pressed = multiseltion otherwise erase arr
    // if (event.shiftKey!=1)
    // _resetSelection();

    // // setTimeout(function() {th.adjustMDS(i);},1000);
    // add id to selected ids for show/hide
    selected_ids = [];
    selected_ids.push(d.id);

    // // add ids of other network vis of selected ids for show/hide
    // th.selected_ids_other_all.push({ id:d.id,data:d[th.selOther].slice() });

    // // merge arrays with ids for easier handling
    // var selected_ids_other_all_temp = [];
    // $.each( th.selected_ids_other_all , function( g, h ) { selected_ids_other_all_temp = $.merge(selected_ids_other_all_temp.slice(), h.data); });

    // get shared nodes of selected ids
    // if(th.selected_ids_other_shared_byall.length == 0) th.selected_ids_other_shared_byall = d[th.selOther].slice();
    // else th.selected_ids_other_shared_byall = th.getSharedNodesOtherVis( selected_ids_other_all_temp );

    //get others ra of selected item
    selected_ids_obj = nodes.filter(datum => d.id == datum.id)[0]
    var selected_ids_others_out = []
    for(var k in selected_ids_obj.ra) selected_ids_others_out.push(parseInt(k))

    var selected_ids_others_in = []
    links.map(function(e,i) {
      if(e.target == d.id) selected_ids_others_in.push(e.source);
    });
    selected_ids_others = {out: selected_ids_others_out, in: selected_ids_others_in}

  }
  else {
    // remove id to selected ids for show/hide
    selected_ids.splice(idx, 1);

    // // add ids of other network vis of selected ids for show/hide
    // th.selected_ids_other_all.splice(idx, 1);
    // var selected_ids_other_all_temp = [];
    // $.each( th.selected_ids_other_all , function( g, h ) { selected_ids_other_all_temp = $.merge(selected_ids_other_all_temp.slice(), h.data); });

    // delay = 1000;
    // // if nothing is selected anymore, reset initial state, otherwise adapt mds to last selection
    // if (th.selected_ids.length == 0) th.resetMDS(th.duration+900);
    // else {
      // change MDS accordingly
      // th.adjustMDS(th.selected_ids[th.selected_ids.length - 1]);
      // update shared nodes of selected ids
      // th.selected_ids_other_shared_byall = th.getSharedNodesOtherVis( selected_ids_other_all_temp );
    // }
  }

  // var anySelectionOther =  (eval(th.selOther+".selected_ids.length") != 0) ? true : false;
  // // reset selection of other network
  // if(anySelectionOther == true) eval(th.selOther+'.resetSelection()');


  // // check if now anything is still selected
  // if (th.selected_ids.length == 0) th.resetSelection();
  // else th.showDirect();
    this.props.interaction(selected_ids, selected_ids_obj, selected_ids_others);

}

_mouseOut() {

  let selected_ids = []
  let selected_ids_obj = {}
  let selected_ids_others = {}
  this.props.interaction(selected_ids, selected_ids_obj, selected_ids_others);

}



	render() {
    let { nodes, selected_ids, selected_ids_obj, selected_ids_others } = this.props.app
    var that = this;

		return (
			   <g>
            { nodes.map(function(d, i) {
                var status = selected_ids.length > 0 ? (_.indexOf(selected_ids, d.id ) >= 0 ? 'show root' : 'hide' ) : ''
                if(status=='hide') status = selected_ids_others != {} ? (_.indexOf(selected_ids_others.in, d.id ) >= 0 || _.indexOf(selected_ids_others.out, d.id ) >= 0 ? 'show' : 'hide' ) : status

                return (
                  <g className={ "node ra ra_id_" + i + " " + status }
                    key={ i }
                    onMouseOver={ that._mouseOver.bind(that,d) }
                    onMouseOut={ that._mouseOut.bind(that) }
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