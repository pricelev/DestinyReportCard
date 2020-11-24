import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Card,
} from "react-bootstrap";
import "./Signup.css";
import Axios from "axios";

export default function Signup() {
  const registerAPI = "http://www.destinyreportcard.com:3001/register";
  const [emailReg, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [membershipIDReg, setMembershipID] = useState("");
  const [registerStatus, setregisterStatus] = useState("");

  const register = () => {
    Axios.post(registerAPI, {
      email: emailReg,
      password: passwordReg,
      membershipID: membershipIDReg,
    }).then((response) => {
      setregisterStatus(response.data.message);
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
          <h2>{registerStatus}</h2>
        </div>
      </Card>
    </div>
  );
}
