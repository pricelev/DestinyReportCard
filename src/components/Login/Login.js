import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import Axios from "axios";
import {useHistory} from 'react-router-dom';

export default function Login() {
  const CORS = "https://cors-anywhere.herokuapp.com/";
  const API = "http://www.destinyreportcard.com:3001/login";
  const localAPI = "http://localhost:3001/login";

  const [emailReg, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");

  const [loginStatus, setloginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  let history = useHistory();

  const login = () => {
    Axios.post(CORS + API, {
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      if (response.data.message){
        setloginStatus(response.data.message);
      }
      else {
        setloginStatus(response.data[0].email);
        history.push('/');
      }
      console.log(response.data);
    });
  }

  useEffect(() => {
    Axios.get(localAPI).then((response) => {
      if (response.data.loggedIn == true){
        setloginStatus(response.data.user[0].email);
      }
    });
  }, []);

  function validateForm() {
    return emailReg.length > 0 && passwordReg.length > 0;
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
            value={emailReg}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={passwordReg}
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