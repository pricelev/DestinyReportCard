import React from "react";
import "./Leaderboard.css";
import Leaderboard_Table from "./Leaderboard_Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <Container>
        <Carousel className="leaderboard-carousel">
          <Carousel.Item>
            <Row className="justify-content-center">
              <h1 className="console-title">TOP PC</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={5} className="leaderboard">
                <Leaderboard_Table title={"PVP LEADERBOARD"} />
              </Col>
              <Col lg={5} className="leaderboard">
                <Leaderboard_Table title={"PVE LEADERBOARD"} />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="justify-content-center">
              <h1 className="console-title">TOP PS4</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={5} className="leaderboard">
                <Leaderboard_Table title={"PVP LEADERBOARD"} />
              </Col>
              <Col lg={5} className="leaderboard">
                <Leaderboard_Table title={"PVE LEADERBOARD"} />
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="justify-content-center">
              <h1 className="console-title">TOP XBOX</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Col lg={5} className="leaderboard">
                <Leaderboard_Table title={"PVP LEADERBOARD"} />
              </Col>
              <Col lg={5} className="leaderboard">
                <Leaderboard_Table title={"PVE LEADERBOARD"} />
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}

export default Leaderboard;
