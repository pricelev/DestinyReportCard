import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap"
import Axios from 'axios';

import ReportSummary from "./ReportSummary";
import ProfileChart from "./ProfileChart";
import CharacterPanel from "./CharacterPanel";

const API = "http://www.destinyreportcard.com:3001/reportCard/?membershipId=";
const CORS = "https://cors-anywhere.herokuapp.com/";
const followAPI = "http://www.destinyreportcard.com:3001/addFollow";
const removeFollowAPI = "http://www.destinyreportcard.com:3001/removeFollow";
const checkFollowAPI = "http://www.destinyreportcard.com:3001/checkFollow";
const loginAPI = "http://www.destinyreportcard.com:3001/login";


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
      following: false,
      loginStatus: false,
    };
  }

  componentDidMount() {
    fetch(
      CORS + API + this.state.memId + "&membershipType=" + this.state.memType
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.characters.characterInfo.length === 3) {
            let character1 = data.characters.characterInfo[0];
            let character2 = data.characters.characterInfo[1];
            let character3 = data.characters.characterInfo[2];
            if (character1.LightLevel >= character2.LightLevel) {
              if (character1.LightLevel >= character3.LightLevel) {
                this.setState({
                  profPic: character1.emblemIcon,
                });
              } else {
                this.setState({
                  profPic: character3.emblemIcon,
                });
              }
            } else if (character2.LightLevel >= character3.LightLevel) {
              this.setState({
                profPic: character2.emblemIcon,
              });
            } else {
              this.setState({
                profPic: character3.emblemIcon,
              });
            }
          } else {
            this.setState({
              profPic: data.characters.characterInfo[0].emblemIcon,
            })
          }
          
          this.setState({
            isLoaded: true,
            profileData: data,
            displayName: data.playerInfo.DisplayName.value,
          });
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(loginAPI).then((response) => {
      if (response.data.loggedIn == true) {
        this.setState({
          loginStatus: true,
        });
        console.log(response.data.user[0].email);
        let email = response.data.user[0].email;
        console.log(response.data.user[0].membershipID);
        let membershipID = response.data.user[0].membershipID;
        console.log(this.state.memId);
        let followID = this.state.memId;
        Axios.get(checkFollowAPI, {
          params: {
            email: email,
            membershipID: membershipID,
            followID: followID,
          }
        }).then((response) => {
          console.log(response);
          console.log(response.data.isFollow);
          if (response.data.isFollow == true) {
            this.setState({
              following: true,
            });
          }
          else {
            this.setState({
            following: false,
            });
          }
        });
      }
      else {
        this.setState({
          loginStatus: false,
        });
      }
    });
  }

  follow = () => {
    Axios.get(loginAPI).then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        Axios.post(followAPI, {
          email: response.data.user[0].email,
          membershipID: response.data.user[0].membershipID,
          followID: this.state.memId,
        }).then((response) => {
          this.setState({
            following: true,
          })
        });
      } else {
        this.setState({
          loginStatus: false
        });
      }
    });
  };

  unfollow = () => {
    Axios.get(loginAPI).then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        Axios.post(removeFollowAPI, {
          email: response.data.user[0].email,
          membershipID: response.data.user[0].membershipID,
          followID: this.state.memId,
        }).then((response) => {
          this.setState({
            following: false,
          })
        });
      } else {
        this.setState({
          loginStatus: false
        });
      }
    });
  };

  render() {
    if (this.state.isLoaded) {
      let aggregate = this.state.profileData.stats.playtime.grade;
      let pvp_grade = this.state.profileData.stats.CombatRatingPvP.grade;
      let playtime_grade = this.state.profileData.stats.playtime.grade;
      let pve_grade = this.state.profileData.stats.pvekd.grade;
      let strikes_grade = this.state.profileData.stats.strikecompletions.grade;
      let triumph_grade = this.state.profileData.stats.triumphscore.grade;
      let raids_grade = this.state.profileData.stats.raidclears.grade;
      let link = "../reportcard/";
      

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
      let profilepic = this.state.profPic;
      return (
        <div className="profile-container">
          <div className="profile-top">
            <Container>
              <Row>
                <Col lg={2}>
                  <img
                    src={profilepic}
                    className="profile-img rounded-circle"
                    alt="Profile Pic"
                  />
                </Col>
                <Col lg={6}>
                  <Row>
                    <h1 className="top-username">
                      {this.state.profileData.playerInfo.DisplayName.value}
                    </h1>
                  </Row>
                  <Row>
                    {this.state.loginStatus == true && this.state.following == false && (
                    <Button
                      className="repFollowButton"
                      style={{marginTop: 10}}
                      type="submit"
                      onClick={this.follow}
                      >
                      Follow
                    </Button>
                    )}
                    {this.state.loginStatus == true && this.state.following == true &&(
                    <Button
                      className="repFollowButton"
                      style={{marginTop: 10}}
                      type="submit"
                      onClick={this.unfollow}
                      >
                      UnFollow
                    </Button>
                    )}
                  </Row>
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
