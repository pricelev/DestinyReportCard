import React, { Component } from "react";
import Axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./PlayerSearch.css";
import { Button } from "react-bootstrap";

const API = "http://www.destinyreportcard.com:3001/getPlayer/?displayName=";
const followAPI = "http://www.destinyreportcard.com:3001/addFollow";
const CORS = "https://cors-anywhere.herokuapp.com/";

const steam_white =
  "https://www.bungie.net/img/theme/bungienet/icons/steamLogo.png";

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

  follow = () => {
    Axios.post(CORS + followAPI, {}).then((response) => {});
  };

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
            <Col lg={2}></Col>
            <Col lg={8}>
              <div className="result-container">
                <div className="search-header">
                  <h1> Search Results</h1>
                </div>
                <Row>
                  <Col lg={1}></Col>
                  <Col lg={10}>
                    {this.state.players.map((player, index) => {
                      let emblem = player.emblem;
                      if (emblem === steam_white) {
                        emblem = "/steam-icon.png";
                      }
                      return (
                        <a
                          href={
                            link +
                            player.membershipType +
                            "/" +
                            player.MembershipID
                          }
                        >
                          <Card className="result-card shadow p-3 mb-5 bg-white rounded">
                            <div className="result-content">
                              <Row>
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
                                <Col md="auto">
                                  <Button
                                    className="followButton"
                                    type="submit"
                                    onClick={this.follow}
                                  >
                                    Follow
                                  </Button>
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
            <Col lg={2}></Col>
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
