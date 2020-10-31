import React from "react";
import "./Searchbar.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Searchbar() {
  return (
    <div className="searchbar-section">
      <Container>
        <Row>
          <div className="search-text">
            <Col lg={12}>
              <h1>Generate your report card.</h1>
            </Col>
          </div>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="searchbar">
              <input
                className="search_input"
                type="text"
                name=""
                placeholder="Find your Guardian..."
              />
              <a href="#" className="search_icon">
                <img src="search.png" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Searchbar;
