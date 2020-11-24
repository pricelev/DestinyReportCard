import React, { Component } from "react";
import { Row, Col, Table } from "react-bootstrap";
import "./StatsTable.css";

const stats = {
  playtime: {
    value: 10091655,
    avg: 2188937.6,
    stdDev: 1950440.8332635807,
    grade: 100,
  },
  pvekd: {
    value: 49.35,
    avg: 30.644,
    stdDev: 40.636183076169935,
    grade: 85,
  },
  raidclears: {
    value: 820,
    avg: 55.825,
    stdDev: 130.3987897758258,
    grade: 100,
  },
  strikecompletions: {
    value: 1672,
    avg: 326.725,
    stdDev: 312.6994553481024,
    grade: 100,
  },
  nightfalls: {
    value: 460,
    avg: 81.5,
    stdDev: 88.18446575219463,
    grade: 100,
  },
  publicevents: {
    value: 1768,
    avg: 456.55,
    stdDev: 427.7238565944154,
    grade: 100,
  },
  pvpkd: {
    value: 1.58,
    avg: 0.877,
    stdDev: 0.37397994598641277,
    grade: 100,
  },
  pvpWL: {
    value: 1.8,
    avg: 0.83175,
    stdDev: 0.3889465740946952,
    grade: 100,
  },
  CombatRatingPvP: {
    value: 174,
    avg: 110.275,
    stdDev: 40.636183076169935,
    grade: 100,
  },
  trialsRecord: {
    value: 0.6728,
    avg: 0.28469167,
    stdDev: 0.14961035201668213,
    grade: 100,
  },
  triumphscore: {
    value: 143042,
    avg: 56821.975,
    stdDev: 32479.445382801325,
    grade: 100,
  },
};

const table_headers = [
  "Playtime",
  "PvE K/D",
  "Raid Clears",
  "Strike Completions",
  "Nightfalls",
  "Public Events",
  "PvP K/D",
  "PvP W/L",
  "PvP Combat Rating",
  "Trials Record",
  "Triumph Score",
];

class StatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
    // COMMENT THIS BEFORE PUSHING
    // this.state = {
    //   data: stats,
    // };
  }

  render() {
    const row = (val1, val2, val3, val4) => (
      <tr>
        <td>{val1}</td>
        <td>{val2}</td>
        <td>{val3}</td>
        <td>{val4}</td>
      </tr>
    );

    let stats = Object.entries(this.state.data);
    let table = stats.map((key, index) => {
      if (key[0] === "playtime") {
        return row(
          table_headers[index],
          (key[1].value / 3600).toFixed(2),
          (key[1].avg / 3600).toFixed(2),
          (key[1].stdDev / 3600).toFixed(2)
        );
      }
      return row(
        table_headers[index],
        key[1].value.toFixed(2),
        key[1].avg.toFixed(2),
        key[1].stdDev.toFixed(2)
      );
    });

    return (
      <div className="stats-table-container">
        <Row className="m-0">
          <Col lg={{ span: 8, offset: 2 }}>
            <Table striped bordered hover className="table-blue">
              <thead>
                <tr>
                  <th className="table-title" colSpan="4">
                    Your Statistics
                  </th>
                </tr>
                <tr className="table-heading">
                  <th>Category</th>
                  <th>You</th>
                  <th>Community Average</th>
                  <th>Standard Deviation</th>
                </tr>
              </thead>
              <tbody>{table}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StatsTable;
