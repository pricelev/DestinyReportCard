import React from "react";
import "./Main.css";

import Searchbar from "./Searchbar";
import Leaderboard from "./Leaderboard";
import News from "./News"
import Footer from "./Footer"

function Main() {
  return (
    <div className="main-section">
      <Searchbar />
      <Leaderboard />
      <News />
      <Footer />
    </div>
  );
}

export default Main;
