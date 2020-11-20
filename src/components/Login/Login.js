import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Axios from "axios";

export default function Login() {
  const CORS = "https://cors-anywhere.herokuapp.com/";
  const API = "http://www.destinyreportcard.com:3001/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setloginStatus] = useState("");

  const login = () => {
    Axios.post(CORS + API, {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message){
        setloginStatus(response.data.message);
      }
      else {
        setloginStatus(response.data[0]);
      }
    });
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
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
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit" onClick={login}>
          Login
        </Button>
      </form>
      <h1>{loginStatus}</h1>
    </div>
  );
}