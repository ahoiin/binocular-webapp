import React, { Component, PropTypes } from 'react'


class NetworkCanvas extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.width != nextProps.width || this.props.height != nextProps.height) ? true : false;
  }

  render() {
    console.log("render canvas");
    let { width, height, margin } = this.props

    return (
        <canvas ref="canvas" className="canvas" width={ width } height={ height } style={{left: margin.left, top: margin.top, position: "absolute", pointerEvents: "none"}} />
    )
  }
}


NetworkCanvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object
};

NetworkCanvas.defaultProps = {
  width: 400,
	height: 300,
  margin: {top: 20, right: 10, bottom: 30, left: 40}
};


export default NetworkCanvas;


