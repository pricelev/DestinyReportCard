import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Topnav from "./components/Topnav";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Profile from "./components/Profile/Profile";
import ReportCard from "./components/Profile/ReportCard";
import PlayerSearch from "./components/PlayerSearch/PlayerSearch";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Following from "./components/Profile/Following";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Topnav />
          <Route exact path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Route
            exact
            path="/reportcard/:membershipType/:membershipId"
            component={ReportCard}
          />
          <Route
            exact
            path="/following"
            component={Following}
          />
          <Route
            exact
            path="/PlayerSearch/:displayName"
            component={PlayerSearch}
          />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
