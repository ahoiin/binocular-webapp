import React, { Component, PropTypes } from 'react'
import BasicChart from './BasicChart'

class Chart extends Component {

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.shouldUpdate;
  };

  render() {
    var props = this.props;
    return (
      <BasicChart
        svgClassName={props.svgClassName}
        titleClassName={props.titleClassName}
        {...this.props} />
    );
  }

}

Chart.propTypes = {
    legend:         React.PropTypes.bool,
    svgClassName:   React.PropTypes.string,
    titleClassName: React.PropTypes.string,
    shouldUpdate:   React.PropTypes.bool
};

Chart.defaultProps = {
    legend:         false,
    svgClassName:   'rd3-chart',
    titleClassName: 'rd3-chart-title',
    shouldUpdate:   true
};



export default Chart;