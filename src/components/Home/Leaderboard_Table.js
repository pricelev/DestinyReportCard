import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "./Leaderboard.css";

class Leaderboard_Table extends Component {
  render() {
    let link = "../reportcard/";
    const row = (item, rank, type) => (
      <tr key={item.DisplayName + "-object"}>
        <td>{rank}</td>
        <td>
          <a
            className="leaderboard-item"
            href={link + item.MembershipType + "/" + item.MembershipID}
          >
            {item.DisplayName}
          </a>
        </td>
        <td>{item[type]}</td>
      </tr>
    );
    let table = this.props.data.map((i, index) =>
      row(i, index + 1, this.props.type)
    );

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
            <th>{this.props.subtitle}</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    );
  }
}

export default Leaderboard_Table;
