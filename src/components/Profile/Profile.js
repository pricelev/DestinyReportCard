import React, { Component } from "react";
import "./Profile.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ReportSummary from "./ReportSummary";

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-top">
          <Container>
            <Row>
              <Col lg={2}>
                <img src="bg-01.jpg" className="profile-img rounded-circle" />
              </Col>
              <Col lg={6}>
                <h1 className="top-username">Username</h1>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="profile-main-container">
          <div className="profile-main">
            <ReportSummary grades={[0, 0, 0, 0, 0, 0, 0]} />
          </div>
        </Container>
      </div>
    );
  }
}

export default Profile;
