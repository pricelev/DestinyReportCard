import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Signup.css";
import Axios from "axios";

export default function Signup() {
  const CORS = "https://cors-anywhere.herokuapp.com/";
  const API = "http://www.destinyreportcard.com:3001/register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [membershipID, setMembershipID] = useState("");

  const register = () => {
    Axios.post(CORS + API, {
      email: email,
      password: password,
      membershipID: membershipID
    }).then((response) => {
      console.log(response.data);
    });
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="text" bsSize="large">
          <FormLabel>Membership ID</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={membershipID}
            onChange={e => setMembershipID(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit" onClick={register}>
          Signup
        </Button>
      </form>
    </div>
  );
}