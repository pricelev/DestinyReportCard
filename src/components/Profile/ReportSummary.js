import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class ReportSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
    };
  }

  componentDidMount() {
    let grades = this.props.grades;
    document.getElementById(
      "aggregate-grade"
    ).innerHTML = `<img src=${this.getGradeIcon(
      grades[0]
    )} alt="letter_grade" />`;
    for (let i = 1; i < grades.length; i++) {
      document.getElementById(
        "pos-" + i
      ).innerHTML = `<img src=${this.getGradeIcon(
        grades[i]
      )} alt="letter_grade" />`;
    }
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <Row>
          <Col lg={{ span: 2, offset: 2 }}>
            <Row className="h-100 margin-zero">
              <Card className="aggregate-card">
                <div className="aggregate-score">
                  <div className="grade-img" id="aggregate-grade"></div>
                  <br></br>
                  <h5>Aggregate Score</h5>
                </div>
              </Card>
            </Row>
          </Col>
          <Col lg={6} className="summary-col">
            <Card className="report-card">
              <Row className="report-card-row h-100">
                <Col lg={6}>
                  <Card className="report-card-item">
                    <Row className="h-100">
                      <Col lg={3} className="score-img-container">
                        <div className="score-img" id="pos-1"></div>
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
                        <div className="score-img" id="pos-2"></div>
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
                        <div className="score-img" id="pos-3"></div>
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
                        <div className="score-img" id="pos-4"></div>
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
                        <div className="score-img" id="pos-5"></div>
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
                        <div className="score-img" id="pos-6"></div>
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
      return null;
    }
  }

  getGradeIcon(grade) {
    if (grade >= 97) {
      return "/grade_aplus.png";
    } else if (grade >= 93) {
      return "/grade_a.png";
    } else if (grade >= 87) {
      return "/grade_bplus.png";
    } else if (grade >= 83) {
      return "/grade_b.png";
    } else if (grade >= 80) {
      return "/grade_bminus.png";
    } else if (grade >= 77) {
      return "/grade_cplus.png";
    } else if (grade >= 73) {
      return "/grade_c.png";
    } else if (grade >= 70) {
      return "/grade_cminus.png";
    } else {
      return "/grade_d.png";
    }
  }
}

export default ReportSummary;
