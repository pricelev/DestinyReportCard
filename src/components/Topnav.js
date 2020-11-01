import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./Topnav.css";

function Topnav() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <Navbar.Brand href="#home">Destiny Report Card</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" id="nav-item-white">
            Home
          </Nav.Link>
          <Nav.Link href="/leaderboards" id="nav-item-white">
            Leaderboards
          </Nav.Link>
          <Nav.Link href="/profile" id="nav-item-white">
            Profile (MOCKUP)
          </Nav.Link>
          <Nav.Link href="/ReportCard" id="nav-item-white">
            Report Card
          </Nav.Link>
          <NavDropdown title="Action" id="nav-item-white">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Button className="nav-button">Login</Button>
          <Button className="nav-button">Signup</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topnav;
