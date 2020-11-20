import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./PlayerSearch.css";

const API = "http://www.destinyreportcard.com:3001/getPlayer/?displayName=";
const CORS = "https://cors-anywhere.herokuapp.com/";

class PlayerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      displayName: this.props.match.params.displayName,
      players: [],
    };
  }

  componentDidMount() {
    fetch(CORS + API + this.state.displayName)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({
            isLoaded: true,
            players: data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // test for when server doesnt respond
    // let test_data = [
    //   {
    //     DisplayName: "Gon",
    //     membershipType: "3",
    //   },
    //   {
    //     DisplayName: "Gondirk",
    //     membershipType: "2",
    //   },
    //   {
    //     DisplayName: "Gon John",
    //     membershipType: "1",
    //   },
    // ];
    // this.setState({
    //   isLoaded: true,
    //   players: test_data,
    // });
  }

  render() {
    if (this.state.isLoaded) {
      let link = "../reportcard/";
      if (this.state.players.length === 0) {
        return (
          <div className="search-main">
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <div className="result-container" style={{ height: "400px" }}>
                  <div className="search-header">
                    <h1> Search Results</h1>
                  </div>
                  <br></br>
                  <br></br>
                  <div class="query-error">
                    <h4>
                      No results found for the query "
                      {this.props.match.params.displayName}"
                    </h4>
                  </div>
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        );
      }
      return (
        <div className="search-main">
          <Row>
            <Col lg={1}></Col>
            <Col lg={10}>
              <div className="result-container">
                <div className="search-header">
                  <h1> Search Results</h1>
                </div>
                <Row>
                  <Col lg={1}></Col>
                  <Col lg={10}>
                    {this.state.players.map((player, index) => {
                      let icon = "";
                      if (player.membershipType === 1) {
                        icon = "/xbox-icon.png";
                      } else if (player.membershipType === 2) {
                        icon = "/ps-icon.png";
                      } else {
                        icon = "/steam-icon.png";
                      }
                      let emblem = player.emblem;
                      return (
                        <a
                          href={
                            link +
                            player.membershipType +
                            "/" +
                            player.MembershipID
                          }
                        >
                          <Card className="result-card">
                            <div className="result-content">
                              <Row>
                                <Col lg={1}>
                                  <img
                                    src={icon}
                                    className="platform-icon"
                                    width="40"
                                    alt="Player Emblem"
                                  ></img>
                                </Col>
                                <Col md="auto">
                                <img 
                                  src={emblem}
                                  className="player-emblem"
                                  width="40"
                                  alt="Player Emblem"
                                  ></img>
                                </Col>
                                <Col md="auto" className="display-name">
                                  {player.DisplayName}
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </a>
                      );
                    })}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={1}></Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className="search-main">
          <Row>
            <Col lg={1}></Col>
            <Col lg={10}>
              <div className="result-container">
                <div className="summary-spinner-container">
                  <Spinner
                    className="summary-spinner"
                    animation="grow"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <p>Fetching Data...</p>
                  <p className="text-muted">This may take a while</p>
                </div>
              </div>
            </Col>
            <Col lg={1}></Col>
          </Row>
        </div>
      );
    }
  }
}

export default PlayerSearch;
