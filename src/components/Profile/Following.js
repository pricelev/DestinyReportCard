import React, { Component } from "react";
import Axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "../PlayerSearch/PlayerSearch.css";

const API = "http://www.destinyreportcard.com:3001/followingList";
const loginAPI = "http://www.destinyreportcard.com:3001/login";

const steam_white =
  "https://www.bungie.net/img/theme/bungienet/icons/steamLogo.png";

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      displayName: this.props.match.params.displayName,
      email: this.props.match.params.displayName,
      players: [],
      loginstatus: false,
    };
  }

  componentDidMount() {
    Axios.get(loginAPI).then((response) => {
      if (response.data.loggedIn === true) {
        this.setState({
          loginstatus: true,
          email: response.data.user[0].email,
        });
        Axios.get(API, {
          params: {
            membershipID: response.data.user[0].membershipID,
          },
        }).then((response) => {
          this.setState({
            players: response.data,
            isLoaded: true,
          });
        });
      } else {
        this.setState({
          loginstatus: false,
        });
      }
    });
  }
  /* componentDidMount() {
    fetch(CORS + API)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({
            isLoaded: true,
            players: data,
          });
          console.log(this.state.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } */

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
                    <h1> {this.state.displayName} is following: </h1>
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
                  <h1> You are following: </h1>
                </div>
                <Row>
                  <Col lg={1}></Col>
                  <Col lg={10}>
                    {this.state.players.map((player, index) => {
                      let emblem = player.emblemIcon;
                      if (emblem === steam_white) {
                        emblem = "/steam-icon.png";
                      }
                      return (
                        <a
                          href={
                            link +
                            player.membershipType +
                            "/" +
                            player.membershipID
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

export default Following;
