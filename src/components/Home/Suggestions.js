import React from "react";
import "./Searchbar.js";

const steam_white =
  "https://www.bungie.net/img/theme/bungienet/icons/steamLogo.png";

const Suggestions = (props) => {
  let link = "../reportcard/";
  const options = props.results.map((player, index) => {
    let emblem = player.emblem;
    if (emblem == steam_white) {
      emblem = "/steam-icon.png";
    }

    const retStyle = {
      background: "white",
      listStyleType: "none",
      padding: 7,
      borderTop: "1px solid pink",
    };

    const linkStyle = {
      display: "block",
      textDecoration: "none",
    };

    return (
      <li style={retStyle}>
        <a
          style={linkStyle}
          href={link + player.membershipType + "/" + player.MembershipID}
        >
          <img src={emblem} width="20" alt="Player Emblem"></img>
          {player.DisplayName}
        </a>
      </li>
    );
  });

  const autocomBox = {
    height: 190,
    width: 500,
    overflow: "auto",
  };
  return <ul style={autocomBox}>{options}</ul>;
};

export default Suggestions;
