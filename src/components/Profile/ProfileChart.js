import React, { Component } from "react";

import Chart from "react-google-charts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./ProfileChart.css";
import { isWhiteSpaceLike } from "typescript";

class ProfileChart extends Component {
  constructor(props) {
    super(props);
    let data = [
      ["Player", "Player", "Community Average"],
      ["Raid Clears", 0, 0],
      ["Strike Completions", 0, 0],
      ["Nightfalls", 0, 0],
      ["Public Events", 0, 0],
    ];
    if (this.props.data != null) {
      data = this.props.data;
    }
    this.state = {
      data: data,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="chart-container">
        <Row className="chart-row">
          <Col lg={{ span: 8, offset: 2 }}>
            <Chart
              className="barchart"
              width={"100%"}
              height={"100%"}
              chartType="ColumnChart"
              loader={<div>Loading Statistics...</div>}
              data={this.state.data}
              options={{
                title: "Player Statistics",
                backgroundColor: "#0b132b",
                color: "white",
                legendTextStyle: { color: "#FFF" },
                titleTextStyle: { color: "#FFF" },
                chartArea: { width: "60%" },
                colors: ["red", "blue"],
                hAxis: {
                  minValue: 0,
                  textStyle: {
                    color: "#FFFFFF",
                  },
                },
                vAxis: {},
              }}
              // For tests
              rootProps={{ "data-testid": "4" }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileChart;
