import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import "./Signup.css";
import Axios from "axios";

export default function Signup() {
  const CORS = "https://cors-anywhere.herokuapp.com/";
  const API = "http://www.destinyreportcard.com:3001/register";
  const localAPI = "http://localhost:3001/register";

  const [emailReg, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [membershipIDReg, setMembershipID] = useState("");

  const [registerStatus, setregisterStatus] = useState("");

  const register = () => {
    Axios.post(localAPI, {
      email: emailReg,
      password: passwordReg,
      membershipID: membershipIDReg,
    }).then((response) => {
      setregisterStatus(response.data.message);
      console.log(response);
    });
  };

  function validateForm() {
    return emailReg.length > 0 && passwordReg.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="signup-main">
      <Card className="signup-card shadow p-3 mb-5 bg-white rounded">
        <div className="Signup">
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={emailReg}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={passwordReg}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="text" bsSize="large">
              <FormLabel>Membership ID</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={membershipIDReg}
                onChange={(e) => setMembershipID(e.target.value)}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!validateForm()}
              type="submit"
              onClick={register}
            >
              Signup
            </Button>
          </form>
          <h1>{registerStatus}</h1>
        </div>
      </Card>
    </div>
  );
}
