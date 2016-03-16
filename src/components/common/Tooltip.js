import React, { Component, PropTypes } from 'react'

class Tooltip extends Component {

  render() {
  	// console.log(this.props);
    var props = this.props;
    // var display = this.props.show ? 'inherit' : 'none';
    var display = 'inherit'
    var containerStyles = {position: 'fixed', top: props.y, left: props.x, display: display, opacity: 0.8}

    //TODO: add 'right: 0px' style when tooltip is off the chart
    var tooltipStyles = {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: '#ddd',
      borderRadius: '2px',
      padding: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '-15px'
    }
    return (
      <div style={containerStyles}>
        <div style={tooltipStyles}>
          {props.child}
        </div>
      </div>
    );
  }
}


Tooltip.propTypes = {
    x:   React.PropTypes.number,
    y:   React.PropTypes.number,
    child: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.element
    ]),
    show: React.PropTypes.bool
};

Tooltip.defaultProps = {
};



export default Tooltip;