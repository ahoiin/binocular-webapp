import NetworkCanvas from './NetworkCanvas.js';
import React, { Component, PropTypes } from 'react'
import d3 from 'd3'
import _ from 'lodash'


class NetworkLines extends Component {

	// -------------------------- renderCanvas: Links
	_renderCanvas = () => {
		let scatter = this.props.type=="ra" ? this.refs.scatter_ra : this.refs.scatter_rc
	    if(!scatter) return;

	    let ctx = scatter.refs.canvas.getContext('2d');
    	let { width, height, margin, nodes, links, biLinks, selected_ids, selected_ids_others } = this.props

	    var that = this

	    ctx.clearRect(0,0,width,height);

	    biLinks.map(function(d,i) {
	        var dx = d[2].x - d[0].x,
	            dy = d[2].y - d[0].y,
	            dr = Math.sqrt(dx * dx + dy * dy);

	        // show/hide line based if its node has been selected and another related node, too
	        // show connection of connections, too
            // var status = selected_ids.length > 0 && selected_ids_others.length > 0 ? ( (_.indexOf(selected_ids, d[3]) >= 0 || _.indexOf(selected_ids_others, d[3]) >= 0) && (_.indexOf(selected_ids, d[4]) >= 0 || _.indexOf(selected_ids_others, d[4])) >= 0  ? true : false ) : false
            var status = selected_ids.length > 0 && selected_ids_others.length > 0 ? ( _.indexOf(selected_ids, d[3]) >= 0 || _.indexOf(selected_ids, d[4]) >= 0  ? true : false ) : false


	        if(status) that._drawArc(d, dr, ctx);
	    })

	  }



	_drawArc = (d, dr, ctx) => {

		var x0 = dr, y0 = dr
		var x1 = d[0].x, y1 = d[0].y
		var x2 = d[2].x, y2 = d[2].y

	    function ellipse(x1, y1, x2, y2, radius, clockwise) {

			var cBx = (x1 + x2) / 2;    //get point between xy1 and xy2
			var cBy = (y1 + y2) / 2;
			var aB = Math.atan2(y1 - y2, x1 - x2);  //get angle to bulge point in radians
			if (clockwise) { aB += (90 * (Math.PI / 180)); }
			else { aB -= (90 * (Math.PI / 180)); }
			var op_side = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / 2;
			var adj_side = Math.sqrt(Math.pow(radius, 2) - Math.pow(op_side, 2));

			if (isNaN(adj_side)) {
			    adj_side = Math.sqrt(Math.pow(op_side, 2) - Math.pow(radius, 2));
			}

			var Cx = cBx + (adj_side * Math.cos(aB));
			var Cy = cBy + (adj_side * Math.sin(aB));
			var startA = Math.atan2(y1 - Cy, x1 - Cx);       //get start/end angles in radians
			var endA = Math.atan2(y2 - Cy, x2 - Cx);
			var mid = (startA + endA) / 2;
			var Mx = Cx + (radius * Math.cos(mid));
			var My = Cy + (radius * Math.sin(mid));
			ctx.arc(Cx, Cy, radius, startA, endA, clockwise);
		}

		ctx.beginPath();
		ellipse(x1, y1, x2, y2, dr, true)
		ctx.strokeStyle = this.props.type == "ra" ? 'rgba(62,190,255,0.4)' : 'rgba(82,231,150,0.4)';
		ctx.lineWidth = 1;
		ctx.stroke();

	}

	_retinaCheck = ()  => {
		let scatter = this.props.type=="ra" ? this.refs.scatter_ra : this.refs.scatter_rc
		if(!scatter) return;
		let canvas = scatter.refs.canvas;
		let ctx = canvas.getContext('2d');

		if (window.devicePixelRatio > 1) {
		  var canvasWidth = canvas.width;
		  var canvasHeight = canvas.height;

		  canvas.width = canvasWidth * window.devicePixelRatio;
		  canvas.height = canvasHeight * window.devicePixelRatio;
		  canvas.style.width = canvasWidth + 'px';
		  canvas.style.height = canvasHeight + 'px';

		  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		}
	}

	componentDidMount() {
		this._retinaCheck();
	}


	render() {
	    let { width, height, margin, type } = this.props

		return (
			<div>
				<NetworkCanvas ref={ "scatter_" + type } margin={margin} width={width} height={height} />
	        	{this._renderCanvas()}
        	</div>
		)
	}
}


NetworkLines.propTypes = {

};

NetworkLines.defaultProps = {

};



export default NetworkLines;