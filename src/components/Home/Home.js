import React from "react";
import "./Home.css";

import Searchbar from "./Searchbar";
import Leaderboard from "./Leaderboard";
import News from "./News";

function Home() {
  return (
    <div className="main-section">
      <Searchbar />
      <Leaderboard />
      <News />
    </div>
  );
}

export default Home;
