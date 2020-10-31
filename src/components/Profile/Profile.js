import React, { Component } from "react";
import "./Profile.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-top">
          <Container>
            <Row>
              <Col lg={1}>
                <img src="user.png" className="profile-img rounded-circle" />
              </Col>
              <Col lg={3}>
                <h1 className="top-username">Username</h1>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="profile-main-container">
          <div className="profile-main">
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <div className="profile-content">
                  <h1> PROFILE CONTENTS </h1>
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Profile;
