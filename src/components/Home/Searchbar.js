import React, { Component } from "react";
import axios from 'axios';
import "./Searchbar.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Suggestions from "./Suggestions"

class Searchbar extends Component {

  state = {
    query: '',
    results:[]
  }
 
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }

  getInfo = () => {
    axios.get(`https://www.bungie.net/platform/Destiny2/SearchDestinyPlayer/-1/${this.state.query}`, {
      headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": "e9c7d4bb05944ed7a72f8d69aab9f595",
      }
    })
      .then(({ data }) => {
        this.setState({
          results: data
        })
      })
  }


  render() {
    return (<div className="searchbar-section">
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
                ref={input => this.search = input}
                placeholder="Find your Guardian..."
                onChange={this.handleInputChange}
                
              />
              <button onClick={handleSearch} className="search_icon">
                <img src="search.png"></img>
              </button>

              <Suggestions results={this.state.results}/>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  </div>)
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
