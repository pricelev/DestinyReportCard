import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const API = "http://www.destinyreportcard.com:3001/reportCard/?membershipId=";
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
    };
  }

  componentDidMount() {
    console.log("here");
    fetch(
      CORS + API + this.state.memId + "&membershipType=" + this.state.memType
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          console.log("hello");
          this.setState({
            isLoaded: true,
            profileData: data,
            displayName: data.playerInfo.DisplayName.value,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <Container fluid>
          <div className="profile-main">
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <div className="profile-content">
                  <h1> Report Card </h1>
                  {this.state.profileData.playerInfo.DisplayName.value}
                  <table width="500" border="1">
                    <tbody>
                      <tr>
                        <th scope="col">&nbsp;</th>
                        <th scope="col">&nbsp;grade</th>
                        <th scope="col">You&nbsp;&nbsp;</th>
                        <th scope="col">Community&nbsp;</th>
                      </tr>
                      <tr>
                        <td>&nbsp;playtime</td>
                        <td>{this.state.profileData.stats.playtime.grade} </td>
                        <td>
                          {this.state.profileData.stats.playtime.value / 3600}{" "}
                          hours
                        </td>
                        <td>
                          {this.state.profileData.stats.playtime.avg / 3600}{" "}
                          hours
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;PVE KD</td>
                        <td>{this.state.profileData.stats.pvekd.grade}</td>
                        <td>{this.state.profileData.stats.pvekd.value}</td>
                        <td>{this.state.profileData.stats.pvekd.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;Raid Clears</td>
                        <td>{this.state.profileData.stats.raidclears.grade}</td>
                        <td>{this.state.profileData.stats.raidclears.value}</td>
                        <td>{this.state.profileData.stats.raidclears.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;Strike Completions</td>
                        <td>
                          {this.state.profileData.stats.strikecompletions.grade}
                        </td>
                        <td>
                          {this.state.profileData.stats.strikecompletions.value}
                        </td>
                        <td>
                          {this.state.profileData.stats.strikecompletions.avg}
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;NightFalls</td>
                        <td>{this.state.profileData.stats.nightfalls.grade}</td>
                        <td>{this.state.profileData.stats.nightfalls.value}</td>
                        <td>{this.state.profileData.stats.nightfalls.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;Public Events</td>
                        <td>
                          {this.state.profileData.stats.publicevents.grade}
                        </td>
                        <td>
                          {this.state.profileData.stats.publicevents.value}
                        </td>
                        <td>{this.state.profileData.stats.publicevents.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;PvP Ked</td>
                        <td>{this.state.profileData.stats.pvpkd.grade}</td>
                        <td>{this.state.profileData.stats.pvpkd.value}</td>
                        <td>{this.state.profileData.stats.pvpkd.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;Pvp WL</td>
                        <td>{this.state.profileData.stats.pvpWL.grade}</td>
                        <td>{this.state.profileData.stats.pvpWL.value}</td>
                        <td>{this.state.profileData.stats.pvpWL.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;Combat Rating PVP</td>
                        <td>
                          {this.state.profileData.stats.CombatRatingPvP.grade}
                        </td>
                        <td>
                          {this.state.profileData.stats.CombatRatingPvP.value}
                        </td>
                        <td>
                          {this.state.profileData.stats.CombatRatingPvP.avg}
                        </td>
                      </tr>
                      <tr>
                        <td>Trials Recod&nbsp;</td>
                        <td>
                          {this.state.profileData.stats.trialsRecord.grade}
                        </td>
                        <td>
                          {this.state.profileData.stats.trialsRecord.value}
                        </td>
                        <td>{this.state.profileData.stats.trialsRecord.avg}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;Triumph Score</td>
                        <td>
                          {this.state.profileData.stats.triumphscore.grade}
                        </td>
                        <td>
                          {this.state.profileData.stats.triumphscore.value}
                        </td>
                        <td>{this.state.profileData.stats.triumphscore.avg}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2>
                    {" "}
                    Overall Grade:{" "}
                    {this.state.profileData.playerInfo.averageGrade}{" "}
                  </h2>
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        </Container>
      );
    } else {
      return (
        <Container fluid>
          <div className="profile-main">
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <div className="profile-content">
                  <h1> Report Card </h1>
                  loading
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        </Container>
      );
    }
  }
}

export default ReportCard;
