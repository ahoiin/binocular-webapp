import React, { Component } from 'react'
import Network from './index'
import d3_request from 'd3-request'
import dataPath from "file!../../data/data_ra.json"



export default class NetworkExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount = () => {

    var that = this;
    // get seasons data for overview
    d3_request.json(dataPath, function (error, result) {
      if (error) throw error;
      console.log(result);
      that.setState({data: result});
    })

  }


  render () {
    const { ...props } = this.props

    var data_ra = {
        "nodes": [
            {
              "id": 0,
              "name": "@350",
              "val": 2,
              "ra": {
                  "1": 149.33333333333334
              },
              "rc": {
                  "15": 1.9655765920826163
              },
              "y": 1.2884001826661642,
              "x": -21.389426740182337

            },
            {
              "id": 1,
              "name": "@AlertNet",
              "val": 21,
              "ra": {
                  "0": 3.240506329113924
              },
              "rc": {
                  "0": 2.1237899957083592
              },
              "y": -0.857249592608629,
              "x": 21.252553207431248
            }
          ],
          "links": [
            {
                "source": 0,
                "target": 1,
                "val": 112
            }
          ]
        }


    return (
      <div {...props}>

        <Network
        data={ this.state.data }
        />

      </div>
    )
  }
}

          // xDomain={ [0,2000000] } yDomain={ yDomain } width={ 720 } height={ 510 } onZoom={ this.zoom.bind(this) } onClicked={ this.showPopup.bind(this) } id="CountryCode" data={data} xVal="GDP_perCapita" yVal="lifeExpectancy" rVal="GDP" cVal="GDP"
