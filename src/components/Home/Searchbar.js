import React, { Component } from "react";
import "./Searchbar.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Suggestions from "./Suggestions";
import { fn } from "jquery";

const API = "http://www.destinyreportcard.com:3001/getPlayer/?displayName=";
const CORS = "https://cors-anywhere.herokuapp.com/";

class Searchbar extends Component {
  state = {
    query: "",
    results: [],
    isLoaded: false,
  };

  debounced(delay, fn) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    }
  }

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 2) {
          this.getInfo();
        } else if (
          this.state.isLoaded === true &&
          this.state.query.length === 0
        ) {
          this.setState({
            results: [],
          });
        }
      }
    );
  };

  getInfo = () => {
    fetch( API + this.state.query)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({
            isLoaded: true,
            results: data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
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
                    autoComplete="off"
                    ref={(input) => (this.search = input)}
                    placeholder="Find your Guardian..."
                    onChange={this.debounced(400, this.handleInputChange)}
                  />
                  <button onClick={handleSearch} className="search_icon">
                    <img src="search.png"></img>
                  </button>
                  <div className="autocom-box" id="testing">
                    <div className="autocom-box1">
                      <Suggestions results={this.state.results} />
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function handleSearch(e) {
  e.preventDefault();
  let name = document.getElementById("search_text").value;
  if (name != "") {
    window.location.replace("/playersearch/" + name);
  }
}

export default Searchbar;
