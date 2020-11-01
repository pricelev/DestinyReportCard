import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const API = "http://www.destinyreportcard.com:3001/getPlayer/?displayName="
const CORS = "https://cors-anywhere.herokuapp.com/";

class PlayerSearch extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        isLoaded: false,
        displayName: this.props.match.params.displayName,
        players: [],
        
    } 
    
      
  }

  componentDidMount() {
      console.log("here")
    fetch(CORS+API + this.state.displayName)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
        if (data) {
           console.log("hello"); 
          this.setState({
            isLoaded: true,
            players: data
           
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  
  render() {
    if(this.state.isLoaded){

    let link = "../reportcard/";
    let temp = "";

    return (
        
        <Container fluid>
          <div className="profile-main">
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <div className="profile-content">
                  <h1> Players:</h1>
                  
                  {this.state.players.map((player, index ) => (
                    
        <p>
            
            <img src= {player.emblem} width = "20" alt="Player Emblem"></img>

        
            <a href= {link +player.membershipType +"/"+ player.MembershipID} > {player.DisplayName}</a>
            </p>
            


    ))}

                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </div>
        </Container>

    );
    }
    else {   
      return (
        <Container fluid>
        <div className="profile-main">
          <Row>
            <Col lg={1}></Col>
            <Col lg={10}>
              <div className="profile-content">
                <h1> Report Card </h1>
              
               loading
              </div>
            </Col>
            <Col lg={1}></Col>
          </Row>
        </div>
      </Container>
      )
    }
  }
}

export default PlayerSearch;
