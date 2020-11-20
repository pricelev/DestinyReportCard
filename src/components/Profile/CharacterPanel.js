import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./CharacterPanel.css";

class CharacterPanel extends Component {
  componentDidMount() {
    let arr = this.props.data;
    for (let i = 1; i < 4; i++) {
      let type = "";
      if (arr[i - 1].classType === 0) {
        type = "titan";
      } else if (arr[i - 1].classType === 1) {
        type = "hunter";
      } else if (arr[i - 1].classType === 2) {
        type = "warlock";
      } else {
        type = "noclass";
      }
      let element = document.getElementById("char-card-" + i);
      element.classList.add(type);
      if (type !== "noclass") {
        document.getElementById("power-level-" + i).innerHTML =
          arr[i - 1].LightLevel;
      }
    }
  }

  render() {
    return (
      <Row>
        <Col lg={{ span: 8, offset: 2 }}>
          <Card className="character-card">
            <Row className="character-row">
              <Col>
                <Card className="class-card" id="char-card-1">
                  <Row>
                    <Col></Col>
                    <Col>
                      <div className="power-level">
                        <h3 id="power-level-1"></h3>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col>
                <Card className="class-card" id="char-card-2">
                  <Row>
                    <Col></Col>
                    <Col>
                      <div className="power-level">
                        <h3 id="power-level-2"></h3>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col>
                <Card className="class-card" id="char-card-3">
                  <Row>
                    <Col></Col>
                    <Col>
                      <div className="power-level">
                        <h3 id="power-level-3"></h3>
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
  }
}

export default CharacterPanel;
