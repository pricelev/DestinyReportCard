import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./Topnav.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Topnav() {
  const CORS = "https://cors-anywhere.herokuapp.com/";
  const logoutAPI = "http://www.destinyreportcard.com:3001/logout";
  const loginAPI = "http://www.destinyreportcard.com:3001/login";

  const [loginStatus, setloginStatus] = useState(false);

  Axios.defaults.withCredentials = true;
  let history = useHistory();

  const logout = () => {
    Axios.get(logoutAPI, {}).then((response) => {
      console.log(response);
    });
  };

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(loginAPI).then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        setloginStatus(true);
      } else {
        setloginStatus(false);
      }
    });
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <div id="navbar-title">Destiny Report Card</div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" id="nav-item-white">
            Home
          </Nav.Link>
          {loginStatus === true && (
            <Nav.Link href="/profile" id="nav-item-white">
              Profile
            </Nav.Link>
          )}
          {loginStatus === true && (
            <Nav.Link href="/following" id="nav-item-white">
              Following
            </Nav.Link>
          )}
          <Nav.Link
            href="http://destinyreportcard.com/api/"
            id="nav-item-white"
          >
            Documentation
          </Nav.Link>
        </Nav>
        <Nav>
          {loginStatus === false && (
            <Link to="/login">
              <Button className="nav-button">Login</Button>
            </Link>
          )}
          {loginStatus === false && (
            <Link to="/signup">
              <Button className="nav-button">Signup</Button>
            </Link>
          )}
          {loginStatus === true && (
            <Button className="nav-button" onClick={logout}>
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topnav;
