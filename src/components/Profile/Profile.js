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
                <img src="bg-01.jpg" className="profile-img rounded-circle" />
              </Col>
              <Col lg={3}>
                <h1>Username</h1>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="profile-main"></div>
      </div>
    );
  }
}

export default Profile;
