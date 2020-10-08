import React from "react";
import "./Leaderboard.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={5} className="leaderboard">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="table-title" colSpan="4">
                    PVP Leaderboard
                  </th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>ELO</th>
                  <th>Winrate</th>
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
              </tbody>
            </Table>
          </Col>
          <Col lg={5} className="leaderboard">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="table-title" colSpan="4">
                    PVE Leaderboard
                  </th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>ELO</th>
                  <th>Winrate</th>
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
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Leaderboard;
