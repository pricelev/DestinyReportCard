import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class Leaderboard_Table extends Component {
  render() {
    return (
      <Table striped bordered hover className="table-blue">
        <thead>
          <tr>
            <th className="table-title" colSpan="4">
              {this.props.title}
            </th>
          </tr>
          <tr className="table-heading">
            <th>#</th>
            <th>PLAYER</th>
            <th>ELO</th>
            <th>WINRATE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>3000</td>
            <td>99%</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>2900</td>
            <td>90%</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jacob</td>
            <td>2800</td>
            <td>80%</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Jacob</td>
            <td>2800</td>
            <td>80%</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Jacob</td>
            <td>2800</td>
            <td>80%</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default Leaderboard_Table;
