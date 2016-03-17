import React, { Component, PropTypes } from 'react'
import { scale } from 'd3'
import d3 from 'd3'
import { Chart } from './../common'
import Axis from '../common/axis';
import _ from 'lodash'
import './Network.scss'
// import d3_request from 'd3-request'
// import dataPath from "file!../data/season_2015.csv"
import NetworkLines from './NetworkLines'
import NetworkNodes from './NetworkNodes'



class Network extends Component {


  componentWillReceiveProps(nextProps){
    let props = this.props.type=="ra" ? this.props.app.ra : this.props.app.rc
    // if(typeof props.links != 'undefined')

    if( (props.links.length == 0 && typeof nextProps.data.links != 'undefined')
      && (props.nodes.length == 0 && typeof nextProps.data.nodes != 'undefined')
      || (this.props.app.data_ra != nextProps.app.data_ra) )  this._resizeVis(nextProps);
  }


  // -------------------------- scale vis to use full height of space
  _resizeVis = (props) => {

      let nodes = props.data.nodes;
      let links = props.data.links;
      let { padding, width, height, margin } = props;

      // calc scales
      let xDomain = [d3.min(nodes, function(d) {return +d.x; }), d3.max(nodes, function(d) { return +d.x; })]
      let yDomain = [d3.min(nodes, function(d) {return +d.y; }), d3.max(nodes, function(d) { return +d.y; })]
      let valNodesDomain = [d3.min(nodes, function(d) {return +d.val; }), d3.max(nodes, function(d) { return +d.val; })]
      let valLinksDomain = [d3.min(links, function(d) {return +d.val; }), d3.max(links, function(d) { return +d.val; })]

      let scale_node = d3.scale.sqrt().domain(valNodesDomain).range([9,13]).nice()
      let scale_link = d3.scale.sqrt().domain(valLinksDomain).range([0,5]).nice()


      var xScale = d3.scale.linear()
          .domain([xDomain[0], xDomain[1]])
          .range([ margin.left, width - margin.right-margin.left]);

      var yScale = d3.scale.linear()
          .domain([yDomain[0], yDomain[1]])
          .range([0, height-margin.top-margin.bottom]);

      // save new x,y values for graphs
      let nodes_ = _.clone(nodes)

      nodes_.map(function( f, c ) {
        f.x = xScale(f.x); // mirroring just to test the aestetic //
        f.y = yScale(f.y);
      });

    // -------------------------- modify links and create new nodes and links arrays for curved visualisation
      let biLinks = [];

      links.map(function(link, i) {
        var s = nodes_[link.source],
            t = nodes_[link.target],
            i = {}; // intermediate node
        biLinks.push([s, i, t, link.source, link.target, link.val]);
      })

      this.props.init(this.props.type, nodes_, links, biLinks, xDomain, yDomain, valNodesDomain, valLinksDomain, scale_node, scale_link );
    }





// -------------------------- render

  render() {
    let { width, height, margin, interaction, clickedToggle, type } = this.props
    let { clicked, hover } = this.props.app
    let props = this.props.type=="ra" ? this.props.app.ra : this.props.app.rc
    width = width - margin.left - margin.right
    height = height - margin.top - margin.bottom

    return (
      <div className="network" >

        <Chart
          className="network__svg"
          height={height + margin.top + margin.bottom}
          margins={margin}
          width={width + margin.left + margin.right}
        >
          <g transform={ "translate(" + margin.left + "," + margin.top + ")" }>

            <NetworkNodes {...props} {...{width, height, margin, interaction, type, clicked, clickedToggle, hover}} />
          </g>

        </Chart>

        <NetworkLines {...props} {...{width, height, margin, interaction, type, clicked, clickedToggle, hover }} />


      </div>

    )
  }
}



 // componentWillReceiveProps(nextProps){
 //  }



 //  componentDidMount() {
 //  }


Network.propTypes = {
    data: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object,
    padding: PropTypes.number
    // centered: PropTypes.string,
    // xVal: PropTypes.string.isRequired,
    // yVal: PropTypes.string.isRequired,
    // rVal: PropTypes.string.isRequired,
    // cVal: PropTypes.string.isRequired,
    // zoomMax: PropTypes.number.isRequired,
    // onClicked: PropTypes.func,
    // onZoom: PropTypes.func,
    // id_key: React.PropTypes.string,
    // xDomain: PropTypes.array,
    // yDomain: PropTypes.array,
    // rDomain: PropTypes.array,
    // cDomain: PropTypes.array,
    // rRange: PropTypes.array,
    // cRange: PropTypes.array
};

Network.defaultProps = {
  width: 1000,
	height: 800,
  padding: 30,
	// data: [{"x":1,"y":8,"r":8,"c":8}, {"x":3,"y":2,"r":10,"c":2}],
  margin: {top: 40, right: 60, bottom: 40, left: 30}
 //  xVal: "x",
 //  yVal: "y",
 //  rVal: "r",
 //  cVal: "c",
 //  zoomMax: 16,
 //  id: null,
 //  xDomain: null,
 //  yDomain: null,
 //  rDomain: null,
 //  cDomain: null,
 //  rRange: [4, 8],
 //  cRange: ['#d3dfe6','#2980b9']
};



export default Network;
