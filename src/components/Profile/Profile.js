import React, { Component } from "react";
import "./Profile.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ReportSummary from "./ReportSummary";
import CharacterPanel from "./CharacterPanel";
import StatsTable from "./StatsTable";
import FollowerPanel from "./FollowerPanel";

/*
  THIS CLASS IS FOR LOCAL TESTING PURPOSES ONLY, EVERYTHING IS MOVED TO REPORTCARD.JS
*/

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-top">
          <Container>
            <Row>
              <Col lg={2}>
                <img
                  src="profile.jpg"
                  className="profile-img rounded-circle"
                  alt="profile-pic"
                />
              </Col>
              <Col lg={6}>
                <h1 className="top-username">Username</h1>
                <div>
                  <FollowerPanel />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="profile-main-container">
          <div className="profile-main">
            <CharacterPanel
              data={[
                { LightLevel: 1200, classType: 0 },
                { LightLevel: 1305, classType: 2 },
                { LightLevel: 1150, classType: 1 },
              ]}
            />
            <ReportSummary grades={[0, 0, 0, 0, 0, 0, 0]} />
            <StatsTable />
          </div>
        </Container>
      </div>
    );
  }
}

export default Profile;
