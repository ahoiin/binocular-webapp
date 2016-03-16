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
    if(this.props.app.links.length == 0 && typeof nextProps.data.links != undefined)  this._resizeVis(nextProps);
  }


  // -------------------------- scale vis to use full height of space
  _resizeVis = (props) => {

      let nodes = props.data.nodes;
      let links = props.data.links;
      let { padding, width, height } = props;

      // calc scales
      let xDomain = [d3.min(nodes, function(d) {return +d.x; }), d3.max(nodes, function(d) { return +d.x; })]
      let yDomain = [d3.min(nodes, function(d) {return +d.y; }), d3.max(nodes, function(d) { return +d.y; })]
      let valNodesDomain = [d3.min(nodes, function(d) {return +d.val; }), d3.max(nodes, function(d) { return +d.val; })]
      let valLinksDomain = [d3.min(links, function(d) {return +d.val; }), d3.max(links, function(d) { return +d.val; })]

      var xScale = d3.scale.linear()
          .domain([xDomain[0], xDomain[1]])
          .range([ padding, (width - padding)]);

      var yScale = d3.scale.linear()
          .domain([yDomain[0], yDomain[1]])
          .range([padding, (height - padding)]);

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
        biLinks.push([s, i, t, link.source, link.target]);
      })

      this.props.init(nodes_, links, biLinks, xDomain, yDomain, valNodesDomain, valLinksDomain, d3.scale.sqrt().range([6,11]).nice(), d3.scale.sqrt().range([0,100]).nice());
    }





// -------------------------- render

  render() {
    let { width, height, margin } = this.props
    let { nodes, links, biLinks } = this.props.app

    return (
      <div className="network" id="container_ra" >

        <Chart
          className="network__svg"
          height={height + margin.top + margin.bottom}
          margins={margin}
          width={width + margin.left + margin.right}
        >
          <g transform={ "translate(" + margin.left + "," + margin.top + ")" }>

            <NetworkNodes {...this.props} />
          </g>

        </Chart>

        <NetworkLines {...this.props} />

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
  padding: 100,
	// data: [{"x":1,"y":8,"r":8,"c":8}, {"x":3,"y":2,"r":10,"c":2}],
  margin: {top: 20, right: 25, bottom: 30, left: 40}
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
