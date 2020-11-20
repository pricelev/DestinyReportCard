import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./Topnav.css";
import { Link } from "react-router-dom";

function Topnav() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <div id="navbar-title">Destiny Report Card</div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" id="nav-item-white">
            Home
          </Nav.Link>
          <Nav.Link href="/profile" id="nav-item-white">
            Profile (MOCKUP)
          </Nav.Link>
        </Nav>
        <Nav>
          <Link to="/login">
            <Button className="nav-button">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="nav-button">Signup</Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topnav;
