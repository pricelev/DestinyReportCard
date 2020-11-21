import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import ReportSummary from "./ReportSummary";
import ProfileChart from "./ProfileChart";
import CharacterPanel from "./CharacterPanel";

const API = "http://www.destinyreportcard.com:3001/reportCard/?membershipId=";
const API1 = "http://www.destinyreportcard.com:3001/getPlayer/?displayName=";
const CORS = "https://cors-anywhere.herokuapp.com/";

class ReportCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      memType: this.props.match.params.membershipType,
      memId: this.props.match.params.membershipId,
      profileData: {},
      displayName: "",
      profPic: "/profile.jpg",
    };
  }

  componentDidMount() {
    fetch(
      CORS + API + this.state.memId + "&membershipType=" + this.state.memType
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let character1 = data.characters.characterInfo[0];
          let character2 = data.characters.characterInfo[1];
          let character3 = data.characters.characterInfo[2];
          if (character1.LightLevel > character2.LightLevel) {
            if (character1.LightLevel > character3.LightLevel) {
              this.setState({
                profPic: character1.emblemIcon,
              });
            } else {
              this.setState({
                profPic: character3.emblemIcon,
              });
            }
          } else if (character2.LightLevel > character3.LightLevel) {
            this.setState({
              profPic: character2.emblemIcon,
            });
          } else {
            this.setState({
              profPic: character3.emblemIcon,
            });
          }
          this.setState({
            isLoaded: true,
            profileData: data,
            displayName: data.playerInfo.DisplayName.value,
          });
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  }
  render() {
    if (this.state.isLoaded) {
      let aggregate = this.state.profileData.stats.playtime.grade;
      let pvp_grade = this.state.profileData.stats.CombatRatingPvP.grade;
      let playtime_grade = this.state.profileData.stats.playtime.grade;
      let pve_grade = this.state.profileData.stats.pvekd.grade;
      let strikes_grade = this.state.profileData.stats.strikecompletions.grade;
      let triumph_grade = this.state.profileData.stats.triumphscore.grade;
      let raids_grade = this.state.profileData.stats.raidclears.grade;

      let summary = [
        aggregate,
        pvp_grade,
        playtime_grade,
        pve_grade,
        strikes_grade,
        triumph_grade,
        raids_grade,
      ];

      let chart_data = [];
      chart_data.push(["Player", "Player", "Community Average"]);
      chart_data.push([
        "Raid Clears",
        this.state.profileData.stats.raidclears.value
          ? this.state.profileData.stats.raidclears.value
          : 0,
        this.state.profileData.stats.raidclears.avg,
      ]);
      chart_data.push([
        "Strike Completions",
        this.state.profileData.stats.strikecompletions.value
          ? this.state.profileData.stats.strikecompletions.value
          : 0,
        this.state.profileData.stats.strikecompletions.avg,
      ]);
      chart_data.push([
        "Nightfalls",
        this.state.profileData.stats.nightfalls.value
          ? this.state.profileData.stats.nightfalls.value
          : 0,
        this.state.profileData.stats.nightfalls.avg,
      ]);
      chart_data.push([
        "Public Events",
        this.state.profileData.stats.publicevents.value
          ? this.state.profileData.stats.publicevents.value
          : 0,
        this.state.profileData.stats.publicevents.avg,
      ]);

      let character_data = this.state.profileData.characters.characterInfo;

      return (
        <div className="profile-container">
          <div className="profile-top">
            <Container>
              <Row>
                <Col lg={2}>
                  <img
                    src={this.state.profPic}
                    className="profile-img rounded-circle"
                  />
                </Col>
                <Col lg={6}>
                  <h1 className="top-username">
                    {this.state.profileData.playerInfo.DisplayName.value}
                  </h1>
                </Col>
              </Row>
            </Container>
          </div>
          <Container fluid className="profile-main-container">
            <div className="profile-main">
              <CharacterPanel data={character_data} />
              <ReportSummary grades={summary} />
              <ProfileChart
                data={chart_data}
                username={this.state.profileData.playerInfo.DisplayName.value}
              />
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="summary-spinner-container">
          <Spinner className="summary-spinner" animation="grow" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p>Fetching Data...</p>
        </div>
      );
    }
  }
}

export default ReportCard;
