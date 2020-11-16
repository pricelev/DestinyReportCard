import React from 'react'


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
      
      return(<li><a href={link+player.membershipType+"/"+player.MembershipID}>
      {player.DisplayName} <img src={icon} width="20" alt="Player Emblem"></img>
      </a></li>)

  });
    
  

  return <ul>{options}</ul>
}

export default Suggestions