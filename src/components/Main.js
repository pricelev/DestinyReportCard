import React from "react";
import "./Main.css";

import Searchbar from "./Searchbar";
import Leaderboard from "./Leaderboard";

function Main() {
  return (
    <div className="main-section">
      <Searchbar />
      <Leaderboard />
    </div>
  );
}

export default Main;
