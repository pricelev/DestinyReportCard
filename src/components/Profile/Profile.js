import React, { Component } from "react";
import "./Profile.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ProfileChart from "./ProfileChart";
import ReportSummary from "./ReportSummary";
import CharacterPanel from "./CharacterPanel";
import Axios from "axios";

const loginAPI = "http://www.destinyreportcard.com:3001/login";
const API = "http://www.destinyreportcard.com:3001/reportCard/?membershipId=";
const CORS = "https://cors-anywhere.herokuapp.com/";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      memType: 0,
      memId: 0,
      loginStatus: false,
    };
  }

  componentDidMount() {
    Axios.get(loginAPI).then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        this.setState({
          loginStatus: true,
          memType: response.data.user[0].membershipType,
          memId: response.data.user[0].membershipId,
        });
      }
      else {
        this.setState({
          loginStatus: false,
        });
      }
    });
  };

  render() {
    return (
      <div className="profile-container">
        <div className="profile-top">
          <Container>
            <Row>
              <Col lg={2}>
                <img src="profile.jpg" className="profile-img rounded-circle" />
              </Col>
              <Col lg={6}>
                <h1 className="top-username">Username</h1>
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
            <ProfileChart />
          </div>
        </Container>
      </div>
    );
  }
}

export default Profile;
