import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const API = "http://www.destinyreportcard.com:3001/reportCard/?membershipId=";
const CORS = "https://cors-anywhere.herokuapp.com/";

class ReportSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
    };
  }

  componentDidMount() {
    // fetch(
    //   CORS + API + this.state.memId + "&membershipType=" + this.state.memType
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data) {
    //       console.log("hello");
    //       this.setState({
    //         isLoaded: true,
    //         profileData: data,
    //         displayName: data.playerInfo.DisplayName.value,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <Row>
          <Col lg={{ span: 2, offset: 2 }}>
            <Row className="h-100">
              <Card className="aggregate-card">
                <div className="aggregate-score">
                  <div className="grade-img">
                    <img src="./grade_c.png"></img>
                  </div>
                  <br></br>
                  <h5>Aggregate Score</h5>
                </div>
              </Card>
            </Row>
          </Col>
          <Col lg={6}>
            <Card className="report-card">
              <Row className="report-card-row h-100">
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img">
                          <img src="./grade_b.png"></img>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <br></br>
                        <div className="criteria-text">
                          <h3>PVP SKILL</h3>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img">
                          <img src="./grade_a.png"></img>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <br></br>
                        <div className="criteria-text">
                          <h3>PVE SKILL</h3>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row className="report-card-row h-100">
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img">
                          <img src="./grade_cplus.png"></img>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <br></br>
                        <div className="criteria-text">
                          <h3>EXPERIENCE</h3>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img">
                          <img src="./grade_d.png"></img>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <br></br>
                        <div className="criteria-text">
                          <h3>STRIKES</h3>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row className="report-card-row h-100">
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img">
                          <img src="./grade_aminus.png"></img>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <br></br>
                        <div className="criteria-text">
                          <h3>TRIUMPH SCORE</h3>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img">
                          <img src="./grade_bplus.png"></img>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <br></br>
                        <div className="criteria-text">
                          <h3>RAIDS</h3>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      );
    } else {
      return <p>loading</p>;
    }
  }
}

export default ReportSummary;
