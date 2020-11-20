
import React from 'react'
import "./Searchbar.js"



const Suggestions = (props) => {
  let link = "../reportcard/";
  const options = props.results.map((player, index) => {
    let icon = "";
    if (player.membershipType == 1) {
      icon = "/xbox-icon.png";
    } else if (player.membershipType == 2) {
      icon = "/ps-icon.png";
    } else {
      icon = "/steam-icon.png";
    } 
      const retStyle = {
        background: "white",
        listStyleType: "none",
        padding: 5,
        borderBottom: "1px solid navy",
      }

      const linkStyle = {
        display: "block",
        textDecoration: "none",

      }

      return(<li style={retStyle}><a style={linkStyle} href={link+player.membershipType+"/"+player.MembershipID}>
      {player.DisplayName} <img src={icon} width="20" alt="Player Emblem"></img>
      </a></li>)

  });
    
  
  const autocomBox = {
    height: 190,
    width: 500,
    overflow: "auto",
  }
  return <ul style={autocomBox}>{options}</ul>
}

export default Suggestions