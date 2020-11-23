import React, { Component } from "react";
import "./Leaderboard.css";
import Leaderboard_Table from "./Leaderboard_Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

const API = "http://www.destinyreportcard.com:3001/getLeaderboard/?type=";
const CORS = "https://cors-anywhere.herokuapp.com/";

const endpoints = [
  CORS + "http://www.destinyreportcard.com:3001/getLeaderboard/?type=PvPKD",
  CORS + "http://www.destinyreportcard.com:3001/getLeaderboard/?type=PvEKD",
  CORS +
    "http://www.destinyreportcard.com:3001/getLeaderboard/?type=RaidClears",
  CORS +
    "http://www.destinyreportcard.com:3001/getLeaderboard/?type=Nightfalls",
  CORS +
    "http://www.destinyreportcard.com:3001/getLeaderboard/?type=PublicEvents",
  CORS +
    "http://www.destinyreportcard.com:3001/getLeaderboard/?type=StrikeCompletions",
];

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
    };
  }

  componentDidMount() {
    Promise.all(endpoints.map((e) => fetch(e)))
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then((data) => {
        this.setState({
          isLoaded: true,
          data: data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoaded) {
      let data = this.state.data;
      return (
        <div className="leaderboard-container">
          <Container>
            <Carousel className="leaderboard-carousel">
              <Carousel.Item>
                <Row className="justify-content-center">
                  <h1 className="console-title">TOP KILL/DEATH</h1>
                </Row>
                <Row className="justify-content-md-center">
                  <Col lg={5} className="leaderboard">
                    <Leaderboard_Table
                      title={"PVP LEADERBOARD"}
                      subtitle={"K/D RATIO"}
                      data={this.state.data[0].slice(0, 5)}
                      type={"PvPKD"}
                    />
                  </Col>
                  <Col lg={5} className="leaderboard">
                    <Leaderboard_Table
                      title={"PVE LEADERBOARD"}
                      subtitle={"K/D RATIO"}
                      data={this.state.data[1].slice(0, 5)}
                      type={"PvEKD"}
                    />
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row className="justify-content-center">
                  <h1 className="console-title">TOP EVENTS</h1>
                </Row>
                <Row className="justify-content-md-center">
                  <Col lg={5} className="leaderboard">
                    <Leaderboard_Table
                      title={"RAID CLEARS"}
                      subtitle={"COMPLETIONS"}
                      data={this.state.data[2].slice(0, 5)}
                      type={"RaidClears"}
                    />
                  </Col>
                  <Col lg={5} className="leaderboard">
                    <Leaderboard_Table
                      title={"NIGHTFALLS"}
                      subtitle={"COMPLETIONS"}
                      data={this.state.data[3].slice(0, 5)}
                      type={"Nightfalls"}
                    />
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row className="justify-content-center">
                  <h1 className="console-title">TOP EVENTS</h1>
                </Row>
                <Row className="justify-content-md-center">
                  <Col lg={5} className="leaderboard">
                    <Leaderboard_Table
                      title={"PUBLIC EVENTS"}
                      subtitle={"COMPLETIONS"}
                      data={this.state.data[4].slice(0, 5)}
                      type={"PublicEvents"}
                    />
                  </Col>
                  <Col lg={5} className="leaderboard">
                    <Leaderboard_Table
                      title={"STRIKE COMPLETIONS"}
                      subtitle={"COMPLETIONS"}
                      data={this.state.data[5].slice(0, 5)}
                      type={"StrikeCompletions"}
                    />
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Leaderboard;
