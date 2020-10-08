import React from "react";
import "./Main.css";

import Searchbar from "./Searchbar";
import Leaderboard from "./Leaderboard";
import News from "./News"

function Main() {
  return (
    <div className="main-section">
      <Searchbar />
      <Leaderboard />
      <News />
    </div>
  );
}

export default Main;
