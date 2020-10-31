import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Topnav from "./components/Topnav";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Profile from "./components/Profile/Profile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Topnav />
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
