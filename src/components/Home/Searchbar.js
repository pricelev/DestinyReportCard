import React, { Component } from "react";
import axios from 'axios';
import "./Searchbar.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Suggestions from "./Suggestions"

const API = "http://www.destinyreportcard.com:3001/getPlayer/?displayName=";
const CORS = "https://cors-anywhere.herokuapp.com/";

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
    fetch(CORS + API + this.state.query)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({
            isLoaded: true,
            results: data,
          });
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    
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
              <div className="autocom-box">
                <Suggestions results={this.state.results}/>
              </div>
              
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