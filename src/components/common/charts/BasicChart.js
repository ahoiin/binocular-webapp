import React, { Component, PropTypes } from 'react'
import mixins from '../../mixins'

class BasicChart extends Component {


  _renderTitle = () => {
    var props = this.props;

    if (props.title != '' && props.title != null) {
      return (
        <h4
          className={props.titleClassName}
        >
          {props.title}
        </h4>
      );
    } else {
      return null;
    }
  };

  _renderChart = () => {
    var props = this.props;
    return (
      <svg
        className={props.svgClassName}
        height={props.height}
        viewBox={props.viewBox}
        width={props.width}
      >
        {props.children}
      </svg>
    );
  };

  render() {
    var props = this.props;

    return (
      <div
        className={props.className}
        style={{width: props.width + 'px', height: props.height + 'px'}}
      >
        {this._renderTitle()}
        {this._renderChart()}
      </div>
    );
  }
}


BasicChart.propTypes = {
    children:       React.PropTypes.node,
    className:      React.PropTypes.string,
    height:         React.PropTypes.number,
    svgClassName:   React.PropTypes.string,
    title:          React.PropTypes.node,
    titleClassName: React.PropTypes.string,
    width:          React.PropTypes.number
};

BasicChart.defaultProps = {
    className:      'rd3-basic-chart',
    svgClassName:   'rd3-chart',
    titleClassName: 'rd3-chart-title'
};



export default BasicChart;