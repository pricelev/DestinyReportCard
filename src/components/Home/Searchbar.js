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
              <form>
                <input
                  className="search_input"
                  type="text"
                  name=""
                  id="search_text"
                  placeholder="Find your Guardian..."
                />
                <button onClick={handleSearch} className="search_icon">
                  <img src="search.png"></img>
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function handleSearch(e) {
  e.preventDefault();
  let name = document.getElementById("search_text").value;
  if (name != "") {
    window.location.replace("/playersearch/" + name);
  }
}

export default Searchbar;
