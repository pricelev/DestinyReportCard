/**
 * Provides the api services for DestinyReportCard.com
 * endpoint: www.destinyreportcard.com:3001/
 * @name DestinyReportCardApi
 */
function decoy() {
  //im just a decoy for documentation
}

const Api = require("./ApiServices.js");
const DB = require("./DBServices.js");
const mysql = require("mysql");
const conf = require("./config.json");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

const db = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  database: conf.database,
});

const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true,
    schema: {
      tableName: "User_Sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
var allowedOrigins = [
  "http://www.destinyreportcard.com:3000",
  "http://www.destinyreportcard.com:3001",
  "http://www.destinyreportcard.com",
  "http://destinyreportcard.com:3000",
  "http://destinyreportcard.com:3001",
  "http://destinyreportcard.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    key: "UserID",
    secret: "comp-426",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: sessionStore,
    cookie: {
      expires: 5184000000,
    },
  })
);



const port = 3001;

//api interface for get player, when request comes in we need to:
//1: query database for any existing players by that name
//2: query bungie for non-existing players by that name
//3: merge results
//4: return results

/**
 * Queries both bungie and destinyreportcard.com for users matching given name
 * @param {query param} displayName username to search for
 * @returns {Object} Array of matching player information
 * @name getPlayer
 * @example get: http://www.destinyreportcard.com:3001/getPlayer/?displayName=terryboot
 * returnss object:
 * [
 *   {
 *       "DisplayName": "terryboot",
 *       "MembershipID": "4611686018468548442",
 *       "emblem": "https://www.bungie.net/common/destiny2_content/icons/57a9abd2d6ebf19020dce2f7ca04b8a7.jpg",
 *       "xbox": 1,
 *       "psn": 1,
 *       "steam": 1,
 *       "membershipType": 3
 *   }
 *]
 */
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
        let flag = false;
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
        if (allPlayers.length == 0) {
          allPlayers.push(temp);
        }
        allPlayers.forEach((mem) => {
          if (mem.MembershipID != temp.MembershipID) {
            flag = true;
          }
        });
        if (flag == true) allPlayers.push(temp);
      }
      res.send(allPlayers);
    })
    .catch((error) => {});
});

/*
  Api method for client to request a player update
  Requires membership id param
*/
/**
 *  Retrieves current data from bungie.net api and updeates destinyreportcard database
 * @param {query param} membershipId unique member ID number used by destinyreportcard and bungie
 * @param {query param} membershipType unique membership type from bungie to represent home platform
 * @returns {status} 200 on success
 * @name updatePlayer
 * @example get: http://www.destinyreportcard.com:3001/updatePlayer/?membershipId=4611686018468548442&membershipType=3
 *
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

/**
 * Updates database with stats from Bungie api. Then forms a graded report card to represent stat. These stats are in comparison to community averages
 * @param {query param} membershipId unique member ID number used by destinyreportcard and bungie
 * @param {query param} membershipType unique membership type from bungie to represent home platform
 * @returns {Object} JSON object filled with player stats
 * @name reportCard
 * @example get: http://www.destinyreportcard.com:3001/reportCard/?membershipId=4611686018468548442&membershipType=3
 * reponse object:
 *
 * {
 *   "playerInfo": {
 *       "membershipID": {
 *           "value": "4611686018468548442"
 *       },
 *       "DisplayName": {
 *           "value": "terryboot"
 *       },
 *       "averageGrade": 80.76923076923077
 *   },
 *   "characters": {
 *       "characterInfo": [
 *           {
 *               "characterID": "2305843009359784864",
 *               "classType": 0,
 *               "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/57a9abd2d6ebf19020dce2f7ca04b8a7.jpg",
 *               "emblemFull": "https://www.bungie.net/common/destiny2_content/icons/e94ea631cbfc6ddad3646b386dca4f05.jpg",
 *               "LightLevel": 1262
 *           },
 *           {
 *               "characterID": "2305843009358396092",
 *               "classType": 2,
 *               "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/57a9abd2d6ebf19020dce2f7ca04b8a7.jpg",
 *               "emblemFull": "https://www.bungie.net/common/destiny2_content/icons/e94ea631cbfc6ddad3646b386dca4f05.jpg",
 *               "LightLevel": 1261
 *           },
 *           {
 *               "characterID": "2305843009361025170",
 *               "classType": 1,
 *               "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/486c1483be15aabd1ef7adb7a87c7a72.jpg",
 *               "emblemFull": "https://www.bungie.net/common/destiny2_content/icons/3d0142ffcf985e9fab3d3e7d89ec192c.jpg",
 *               "LightLevel": 1261
 *           }
 *       ]
 *   },
 *   "stats": {
 *       "playtime": {
 *           "value": 4211210,
 *           "avg": 1277305.6296,
 *           "stdDev": 2380292.787778026,
 *           "grade": 95
 *       },
 *       "pvekd": {
 *           "value": 19.87,
 *           "avg": 26.61,
 *           "stdDev": 53.819461524391976,
 *           "grade": 75
 *       },
 *       "raidclears": {
 *           "value": 128,
 *           "avg": 50.5185,
 *           "stdDev": 156.53691325888607,
 *           "grade": 85
 *       },
 *       "strikecompletions": {
 *           "value": 621,
 *           "avg": 198.7778,
 *           "stdDev": 376.2904053198835,
 *           "grade": 95
 *       },
 *       "nightfalls": {
 *           "value": 193,
 *           "avg": 60.8148,
 *           "stdDev": 118.9407063724321,
 *           "grade": 95
 *       },
 *       "publicevents": {
 *           "value": 697,
 *           "avg": 230.8889,
 *           "stdDev": 466.61915102014996,
 *           "grade": 95
 *       },
 *       "pvpkd": {
 *           "value": 0.78,
 *           "avg": 0.704643,
 *           "stdDev": 0.5316247477770193,
 *           "grade": 75
 *       },
 *       "pvpWL": {
 *           "value": 0.66,
 *           "avg": 0.827143,
 *           "stdDev": 0.7460460400521882,
 *           "grade": 75
 *       },
 *       "CombatRatingPvP": {
 *           "value": 108,
 *           "avg": 90.9643,
 *           "stdDev": 53.819461524391976,
 *           "grade": 85
 *       },
 *       "trialsRecord": {
 *           "value": 0.2695,
 *           "avg": 0.46378571,
 *           "stdDev": 0.28005986823520135,
 *           "grade": 65
 *       },
 *       "triumphscore": {
 *           "value": 89780,
 *           "avg": 26665.3929,
 *           "stdDev": 41331.73439755401,
 *           "grade": 100
 *       }
 *   }
 *}
 *
 *
 *
 *
 */
app.get("/reportCard", (req, res) => {
  const memID = req.query.membershipId;
  const memType = req.query.membershipType;
  if (!memID) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }

  DB.getReportCard(memID, memType).then((data) => res.send(data));
});

/**
 *  retrieves the leaderboard of a mode type from destinyreportcard based off of players in the db
 * @param {query param} type unique type for different activities in Destiniy
 * @returns {object} objects filled wiht a desc list of players
 * @name getLeaderboard
 * @example get: http://www.destinyreportcard.com:3001/getLeaderboard/?type=RaidClears
 * valid types: PvEKD, PvPKD, PvPWL, TriumphScore, Time, RaidClears, PublicEvents, StrikeCompletions, Nightfalls, Trials
 * returns object:
 * [
 *   {
 *       "MembershipID": "4611686018467284386",
 *       "MembershipType": 3,
 *       "DisplayName": "Datto",
 *       "RaidClears": 819
 *   },
 *   {
 *       "MembershipID": "4611686018468548442",
 *       "MembershipType": 3,
 *       "DisplayName": "terryboot",
 *       "RaidClears": 128
 *   },
 *   {
 *       "MembershipID": "4611686018476536768",
 *       "MembershipType": 3,
 *       "DisplayName": "Frostie",
 *       "RaidClears": 127
 *   },
 *   {
 *       "MembershipID": "4611686018483765326",
 *       "MembershipType": 3,
 *       "DisplayName": "STEV",
 *       "RaidClears": 117
 *   },
 *   {
 *       "MembershipID": "4611686018467209903",
 *       "MembershipType": 3,
 *       "DisplayName": "nKuch",
 *       "RaidClears": 109
 *   },
 *   {
 *       "MembershipID": "4611686018477042917",
 *       "MembershipType": 3,
 *       "DisplayName": "Chigachow",
 *       "RaidClears": 39
 *   },
 *   {
 *       "MembershipID": "4611686018429548091",
 *       "MembershipType": 1,
 *       "DisplayName": "Mazillius",
 *       "RaidClears": 10
 *   },
 *   {
 *       "MembershipID": "4611686018429561036",
 *       "MembershipType": 1,
 *       "DisplayName": "Sand6605193",
 *       "RaidClears": 3
 *   },
 *   {
 *       "MembershipID": "4611686018450583621",
 *       "MembershipType": 1,
 *       "DisplayName": "SCHYMN",
 *       "RaidClears": 3
 *   },
 *   {
 *       "MembershipID": "4611686018443844207",
 *       "MembershipType": 1,
 *       "DisplayName": "Hit The Grind",
 *       "RaidClears": 3
 *   },
 *   {
 *       "MembershipID": "4611686018431731488",
 *       "MembershipType": 1,
 *       "DisplayName": "jesland",
 *       "RaidClears": 3
 *   },
 *   {
 *       "MembershipID": "4611686018430155691",
 *       "MembershipType": 1,
 *       "DisplayName": "Mooslo",
 *       "RaidClears": 3
 *   },
 *   {
 *       "MembershipID": "4611686018509753875",
 *       "MembershipType": 3,
 *       "DisplayName": "Terry",
 *       "RaidClears": 0
 *   },
 *   {
 *       "MembershipID": "4611686018509669614",
 *       "MembershipType": 3,
 *       "DisplayName": "Marc",
 *       "RaidClears": 0
 *   },
 *   {
 *       "MembershipID": "4611686018509275802",
 *       "MembershipType": 3,
 *       "DisplayName": "ST",
 *       "RaidClears": 0
 *   }
 *]
 *
 */
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

/*
  Api method for client to request a player update
  Requires membership id param
*/
/**
 *  Retrieves a list of players that a user follows
 * @param {query param} membershipID unique member ID number used by destinyreportcard and bungie
 * @returns {Object} List of objects
 * @name followingList
 * @example get: http://www.destinyreportcard.com:3001/followingList
 * Object Response
 * [
 *   {
 *       "membershipID": "4611686018467284386",
 *       "DisplayName": "Datto",
 *       "playtime": 10086763,
 *       "pvekd": 49.36,
 *       "raidclears": 819,
 *       "strikecompletions": 1672,
 *       "nightfalls": 460,
 *       "publicevents": 1768,
 *       "pvpkd": 1.58,
 *       "pvpWL": 1.8,
 *       "CombatRatingPvP": 174,
 *       "trialsRecord": 0.6728,
 *       "triumphscore": 143042,
 *       "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/99ad4e538b233298b16cc434e24f53c9.jpg",
 *       "membershipType": 3
 *   },
 *   {
 *       "membershipID": "4611686018476536768",
 *       "DisplayName": "Frostie",
 *       "playtime": 4143411,
 *       "pvekd": 23.37,
 *       "raidclears": 127,
 *       "strikecompletions": 608,
 *       "nightfalls": 191,
 *       "publicevents": 665,
 *       "pvpkd": 1.05,
 *       "pvpWL": 0.7,
 *       "CombatRatingPvP": 119,
 *       "trialsRecord": 0.2695,
 *       "triumphscore": 94587,
 *       "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/ef696558825f40dc18234fd0851e9ae9.jpg",
 *       "membershipType": 3
 *   }
 *]
 */
app.get("/followingList", (req, res) => {
  const memID = req.query.membershipID;
  DB.getFollowingList(memID).then((data) => res.send(data));
});

/*
  Api method for client to request a player update
  Requires membership id param
*/
/**
 *  Retrieves a list of players that follows a player
 * @param {query param} membershipID unique member ID number used by destinyreportcard and bungie
 * @returns {Object} List of objects
 * @name followerList
 * @example get: http://www.destinyreportcard.com:3001/followingList/?membershipID=4611686018468548442
 * Object Response
 * [
 *   {
 *       "membershipID": "4611686018467284386",
 *       "DisplayName": "Datto",
 *       "playtime": 10086763,
 *       "pvekd": 49.36,
 *       "raidclears": 819,
 *       "strikecompletions": 1672,
 *       "nightfalls": 460,
 *       "publicevents": 1768,
 *       "pvpkd": 1.58,
 *       "pvpWL": 1.8,
 *       "CombatRatingPvP": 174,
 *       "trialsRecord": 0.6728,
 *       "triumphscore": 143042,
 *       "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/99ad4e538b233298b16cc434e24f53c9.jpg",
 *       "membershipType": 3
 *   },
 *   {
 *       "membershipID": "4611686018476536768",
 *       "DisplayName": "Frostie",
 *       "playtime": 4143411,
 *       "pvekd": 23.37,
 *       "raidclears": 127,
 *       "strikecompletions": 608,
 *       "nightfalls": 191,
 *       "publicevents": 665,
 *       "pvpkd": 1.05,
 *       "pvpWL": 0.7,
 *       "CombatRatingPvP": 119,
 *       "trialsRecord": 0.2695,
 *       "triumphscore": 94587,
 *       "emblemIcon": "https://www.bungie.net/common/destiny2_content/icons/ef696558825f40dc18234fd0851e9ae9.jpg",
 *       "membershipType": 3
 *   }
 *]
 */
app.get("/followerList", (req, res) => {
  const memID = req.query.membershipID;
  DB.getFollowerList(memID).then((data) => res.send(data));
});

/**
 *  Lookup to see if the current user is following a player
 * @param {body param} email Email of the logged in user
 * @param {body param} membershipID ID linked to the loggin in user
 * @param {body param} followID ID linked to the loggin in user
 * @returns {boolean} true if player follows them, false otherwise
 * @name checkFollow
 * @example get: http://www.destinyreportcard.com:3001/checkFollow
 *
 */
app.get("/checkFollow", (req, res) => {
  const email = req.query.email;
  const memID = req.query.membershipID;
  const followID = req.query.followID;
  DB.checkFollower(email, memID, followID).then((data) => {
    if (data > 0) res.send({ isFollow: true });
    else {
      res.send({ isFollow: false });
    }
  });
});

/**
 *  Follower a player
 * @param {body param} email Email of the logged in user
 * @param {body param} membershipID ID linked to the loggin in user
 * @param {body param} followID ID linked to the loggin in user
 * @returns {status} 200 on success
 * @name addFollow
 * @example post: http://www.destinyreportcard.com:3001/addFollow
 *
 */
app.post("/addFollow", (req, res) => {
  const email = req.body.email;
  const memID = req.body.membershipID;
  const followID = req.body.followID;
  if (!memID || !email || !followID) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }
  DB.addFollow(email, memID, followID).then((data) => {
    res.sendStatus(200);
  });
});

/**
 *  Remove of a followed player from the current players follows
 * @param {body param} email Email of the logged in user
 * @param {body param} membershipID ID linked to the loggin in user
 * @param {body param} followID ID linked to the loggin in user
 * @returns {status} 200 on success
 * @name removeFollow
 * @example post: http://www.destinyreportcard.com:3001/removeFollow
 *
 */
app.post("/removeFollow", (req, res) => {
  const email = req.body.email;
  const memID = req.body.membershipID;
  const followID = req.body.followID;

  if (!memID || !email || !followID) {
    throw new Error("REQUIRED PARAMETER MISSING");
  }
  DB.removeFollow(email, memID, followID).then((data) => {
    res.send(200);
  });
});

/**
 *  Registers a new user
 * @param {body param} email Email of the user
 * @param {body param} membershipID ID linked to the user
 * @param {body param} password Password of the user
 * @returns {object} message whether registration was successful or not
 * @name register
 * @example post: http://www.destinyreportcard.com:3001/register
 *
 */
app.post("/register", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://www.destinyreportcard.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const email = req.body.email;
  const password = req.body.password;
  const membershipID = req.body.membershipID;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (email, password, membershipID) VALUES (?, ?, ?)",
      [email, hash, membershipID],
      (err, result) => {
        console.log(err);
      }
    );
  });
  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          res.send({ message: "Registration successful! You may now login." });
        } else {
          res.send({
            message:
              "Email already registered. Please choose a different email",
          });
        }
      });
    } else {
      res.send({ message: "Registration failed. Please try again." });
    }
  });
});

/**
 *  Checks whether a user is currently logged in
 * @returns {object} status of whether a user is logged in and that user's information
 * @name login
 * @example get: http://www.destinyreportcard.com:3001/login
 *
 */
app.get("/login", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://www.destinyreportcard.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
      membershipId: req.session.membershipId,
      membershipType: req.session.membershipType,
      emblemIcon: req.session.emblemIcon,
    });
  } else {
    res.send({ loggedIn: false });
  }
});

/**
 *  Logs in a registered user
 * @param {body param} email Email of the user
 * @param {body param} password Password of the user
 * @returns {object} message whether login was successful or not and user data if login is successful
 * @name login
 * @example post: http://www.destinyreportcard.com:3001/login
 *
 */
app.post("/login", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://www.destinyreportcard.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT u.* , p.displayName, p.membershipType, c.emblemIcon
  FROM users u , player p, characters c
  WHERE email = ? AND u.membershipID=p.membershipID AND p.membershipID = c.membershipID
  group by c.membershipID
  `,
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            req.session.user = result;
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination." });
          }
        });
      } else {
        res.send({ message: "User does not exist." });
      }
    }
  );
});

/**
 *  Logs out a user
 * @returns {object} object containing login status set to false
 * @name logout
 * @example get: http://www.destinyreportcard.com:3001/logout
 *
 */
app.get("/logout", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://www.destinyreportcard.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.session.user) {
    res.clearCookie("UserID");
    req.session.destroy();
    res.send({ loggedIn: false });
  }
});
