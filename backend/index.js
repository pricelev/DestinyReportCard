const Api = require("./ApiServices.js");
const DB = require("./DBServices.js");

const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());

const port = 3001;


//api interface for get player, when request comes in we need to:
//1: query database for any existing players by that name
//2: query bungie for non-existing players by that name
//3: merge results
//4: return results

app.get("/getPlayer", (req, res) => {
  const name = req.query.displayName;

  //get the promise from database for search
  let DBpromise = DB.searchPlayer(name);

  //get promise from API from search results
  let Apipromise = Api.findPlayer(name);

  Promise.all([DBpromise, Apipromise])
    .then((data) => {
      let dbResult = data[0];
      let apiResults = data[1].data.Response;

      let allPlayers = [];
      for (rows of dbResult) {
        let temp = {
          DisplayName: rows.DisplayName,
          MembershipID: rows.MembershipID,
          emblem: rows.emblem,
          xbox: rows.Xbox,
          psn: rows.PSN,
          steam: rows.Steam,
          membershipType: rows.MembershipType,
        };
        allPlayers.push(temp);
      }
      for (rows of apiResults) {
        let temp = {
          DisplayName: rows.displayName,
          MembershipID: rows.membershipId,
          emblem:
            "https://www.bungie.net/common/destiny2_content/icons/486c1483be15aabd1ef7adb7a87c7a72.jpg",
          xbox: 0,
          psn: 0,
          steam: 0,
          membershipType: rows.membershipType,
        };
        switch (rows.membershipType) {
          case 1:
            temp.xbox = 1;
            temp.emblem =
              "https://www.bungie.net/img/theme/bungienet/icons/xboxLiveLogo.png";
            break;
          case 2:
            temp.psn = 1;
            temp.emblem =
              "https://www.bungie.net/img/theme/bungienet/icons/psnLogo.png";
            break;
          case 3:
            temp.steam = 1;
            temp.emblem =
              "https://www.bungie.net/img/theme/bungienet/icons/steamLogo.png";
            break;
        }
        allPlayers.push(temp);
      }
      res.send(allPlayers);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*
  Api method for client to request a player update
  Requires membership id param
*/
app.get("/updatePlayer", (req, res) => {
  const memID = req.query.membershipId + "";
  const memType = req.query.membershipType;

  if (!memID || !memType) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }

  DB.updatePlayer(memID, memType).then((data) => res.sendStatus(data));
  // res.send("player updated");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/reportCard", (req, res) => {
  const memID = req.query.membershipId;
  const memType = req.query.membershipType;
  if (!memID) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }
  console.log("updating player");

    
    DB.getReportCard(memID,memType).then((data) => res.send(data))


  //DB.getReportCard(memID).then(data => res.send(data));
});

app.get("/getLeaderboard", (req, res) => {
  const type = req.query.type;
  if (!type) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }
  if (
    type === "PvEKD" ||
    type === "PvPKD" ||
    type === "PvPWL" ||
    type === "TriumphScore" ||
    type === "Time" ||
    type === "RaidClears" ||
    type === "PublicEvents" ||
    type === "StrikeCompletions" ||
    type === "Nightfalls" ||
    type === "Trials"
  ) {
    DB.getLeaderboard(type).then((data) => res.send(data));
  } else {
    throw new Error("Invalid paramater");
  }
});

app.get("/followList",(req,res)=>{

  const email = req.query.email;
  DB.getFollowList(email).then((data)=> res.send(data));
});

app.post("/addFollow",(req,res)=>{

  const email = req.query.email;
  const memID = req.query.membershipID;
  const followID = req.query.followID;
   if (!memID || !email || !followID) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }
  DB.addFollow(email,memID,followID).then((data)=>{
    res.sendStatus(200);
  })
});

app.post("/removeFollow",(req,res)=>{
  const email = req.query.email;
  const memID = req.query.membershipID;
  const followID = req.query.followID;
  if (!memID || !email || !followID) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }
  DB.removeFollow(email,memID,followID).then((data)=>{
    res.sendStatus(200);
  })
});

//api method for registering new user
app.post("/register", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const membershipID = req.query.membershipID;

  if (!email || !password) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }

  let response = DB.registerNewUser(email, password, membershipID);
  let result = DB.checkUser(email, password);
  if (response == 200){
    res.send(response);
  }
  else if (result.length > 0){
    res.send(result);
  }
  else {
    res.send({message: "Registration unsuccessful"})
  }
});

//api method for logging in
app.post("/login", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  if (!email || !password) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }

  let result = DB.checkUser(email, password);
  if (result.length > 0){
    res.send(result);
  }
  else {
    res.send({message: "Wrong username/password combination"});
  }
});
