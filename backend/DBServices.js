const mysql = require("mysql");
const Api = require("./ApiServices.js");
const conf = require("./config.json");
class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: conf.host,
      user: conf.user,
      password: conf.password,
      database: conf.database,
    });
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

//searches the database for playsers that constain name
 async function searchPlayer(name) {
  let q =
    'select p.* , max(c.playtime) as playtime, c.emblemicon as emblem, c.emblemfull as emblemfull from player p , characters c where  p.membershipID= c.membershipID and DisplayName like "' +
    name +
    '%" group by c.membershipID ';
  let db = new Database();
  let results =await db.query(q);
  db.close();
  return  results;
}

// function to retreive api info an update a give char
async function updateChar(memID, memType, charID) {
  let db = new Database();
  let stats = Api.getCharacterStats(memID, memType, charID);
  let info = Api.getCharacterInfo(memID, memType, charID);
  let nightfall = Api.getCharacterNightfall(memID, memType, charID);
  let trials = Api.getCharacterTrials(memID, memType, charID);

  await Promise.all([stats, info, nightfall, trials]).then((data) => {
    statsData = data[0].data.Response;
    infoData = data[1].data.Response.character.data;
    trialsData = data[3].data.Response.trials_of_osiris.allTime;
    let trialsWin = 0;
    let trialsMatches = 0;

    const classid = infoData.classType;
    const emblemicon = "https://www.bungie.net" + infoData.emblemPath;
    const emblemfull = "https://www.bungie.net" + infoData.emblemBackgroundPath;
    const lightlevel = infoData.light;

    let pvpplaytime = 0;
    let pveplaytime = 0;
    let raidclears = 0;
    let strikeCompletions = 0;
    let nightfalls = 0;
    let publicEvents = 0;
    if (statsData.allPvP.allTime)
      pvpplaytime = statsData.allPvP.allTime.secondsPlayed.basic.value;

    if (statsData.allPvE.allTime)
      pveplaytime = statsData.allPvE.allTime.secondsPlayed.basic.value;
    let playtime = pvpplaytime + pveplaytime;

    if (statsData.raid.allTime)
      raidclears = statsData.raid.allTime.activitiesCleared.basic.value;

    if (statsData.allStrikes.allTime)
      strikeCompletions =
        statsData.allStrikes.allTime.activitiesCleared.basic.value;

    if (data[2].data.Response.scored_nightfall.allTime)
      nightfalls =
        data[2].data.Response.scored_nightfall.allTime.activitiesCleared.basic
          .value;

    if (statsData.allPvE.allTime)
      publicEvents = statsData.allPvE.allTime.publicEventsCompleted.basic.value;

    if (trialsData) {
      trialsWin = trialsData.activitiesWon.basic.value;
      trialsMatches = trialsData.activitiesEntered.basic.value;
    }

    let q =
      "REPLACE INTO characters" +
      "(membershipID, characterID, class, emblemicon, emblemfull, lightlevel,playtime,raidclears,strikeCompletions,nightfalls,publicevents,TrialsWins,trialsmatches)" +
      "VALUES" +
      "(" +
      memID +
      "," +
      charID +
      ", '" +
      classid +
      "', '" +
      emblemicon +
      "','" +
      emblemfull +
      "'," +
      lightlevel +
      "," +
      playtime +
      "," +
      raidclears +
      "," +
      strikeCompletions +
      "," +
      nightfalls +
      "," +
      publicEvents +
      "," +
      trialsWin +
      "," +
      trialsMatches +
      ")";

    
    db.query(q);
    
  });
  db.close();
}

//updates database for give players memID and memType
async function updatePlayer(memID, memType) {
  let db = new Database();
  let displayName = 0;
  let xbox = false;
  let PSN = false;
  let steam = false;
  let PVETime = 0;
  let PVPTime = 0;
  let PVEKD = 0;
  let PVPKD = 0;
  let PVPWL = 0;
  let triumph = 0;
  let combatRating = 0;

  let Apipromise = Api.findProfile(memID, memType);
  let Apipromise2 = Api.getPlayerStats(memID, memType);
  let Apipromise3 = Api.getRecords(memID, memType);

  Apipromise.then((response) => {
    const profileData = response.data.Response.profile.data;
    displayName = profileData.userInfo.displayName;
    //for ech char, call update char method
    //updatechar(charid)
    for (character of profileData.characterIds) {
      updateChar(memID, memType, character);
    }

    for (value of profileData.userInfo.applicableMembershipTypes) {
      if (value == 1) {
        xbox = true;
      } else if (value == 2) {
        PSN = true;
      } else if (value == 3) {
        steam = true;
      } else {
        console.log(value);
      }
    }
  });

  Apipromise2.then((response) => {
    const pve =
      response.data.Response.mergedAllCharacters.results.allPvE.allTime;
    const pvp =
      response.data.Response.mergedAllCharacters.results.allPvP.allTime;
    PVETime = pve.secondsPlayed.basic.value;
    PVPTime = pvp.secondsPlayed.basic.value;
    PVEKD = pve.killsDeathsRatio.basic.value;
    PVPKD = pvp.killsDeathsRatio.basic.value;
    PVPWL = pvp.winLossRatio.basic.value;
    combatRating = pvp.combatRating.basic.value;
  });

  Apipromise3.then((response) => {
    triumph = response.data.Response.profileRecords.data.lifetimeScore;
  });

  await Promise.all([Apipromise3, Apipromise2, Apipromise]).then((data) => {
    let q =
      "REPLACE INTO player" +
      "(membershipID, membershiptype, displayname, xbox, psn, steam,pvetime,pvptime,pvekd,pvpkd,pvpwl,combatRatingPVP,triumphscore)" +
      "VALUES" +
      "(" +
      memID +
      "," +
      memType +
      ", '" +
      displayName +
      "', " +
      xbox +
      "," +
      PSN +
      "," +
      steam +
      "," +
      PVETime +
      "," +
      PVPTime +
      "," +
      PVEKD +
      "," +
      PVPKD +
      "," +
      PVPWL +
      "," +
      combatRating +
      "," +
      triumph +
      ")";

    
    db.query(q);
  });
  db.close();
  return 200;
}

async function getReportCard(memID) {
  let db = new Database();

  //gets a players stats from player table and character table
  const q =
    "Select p.membershipID,p.DisplayName,SUM(c.playtime) as playtime, p.pvekd, sum(c.RaidClears) as raidclears, sum(c.strikecompletions) as strikecompletions, sum(c.nightfalls) as nightfalls, sum(publicevents) as publicevents, p.pvpkd, p.pvpWL, p.`CombatRatingPvP`,sum(c.trialswins)/sum(c.trialsmatches) as trialsRecord, p.triumphscore " +
    "from characters c , player p " +
    "where c.membershipID = " +
    memID +
    " AND p.membershipID = c.membershipID";

  const communityQ = "select * from grades";

  const charQ= "select characterID,class as classType,emblemIcon,emblemFull,LightLevel from characters where membershipID = "+memID+" order by LightLevel DESC";

  let playerInfo = db.query(q);
  let communityInfo = db.query(communityQ);
  let playerChars = db.query(charQ);
  let ret = {};
  ret["playerInfo"] = {};
  ret["characters"]={};
  ret["stats"] = {};
  
 
  await Promise.all([playerInfo, communityInfo,playerChars]).then((data) => {
    //for column of player stats
    //new object record = (statCol, statColAVG, statColSTD)
    const playerInfo = data[0][0];
    const communityInfo = data[1][0];
    const characters = data[2];
    let grades = [];
    console.log(playerInfo);
    console.log(data[2].length)
    for (var col in playerInfo) {
      const value = playerInfo[col];
      const avg = communityInfo[col + "Avg"];
      const stdDev = communityInfo[col + "Dev"];
      grade = getGrade(value, avg, stdDev);
      grades.push(grade);
      if (!avg) {
        ret["playerInfo"][col] = { value };
      } else {
        ret["stats"][col] = { value, avg, stdDev, grade };
      }
    }
    ret["playerInfo"]["averageGrade"] =
      grades.reduce((a, b) => a + b) / grades.length;
    let characterInfo = [];
    data[2].forEach(char=>{
      characterInfo.push(char);
    })
    ret["characters"]={characterInfo};
      
     
  });
  db.close();
  return ret;
}
function getGrade(value, avg, stdDev) {
  const step = 0.5 * stdDev;
  let gradeD = avg - 0.5 * step - step;
  let gradeAmt = 55;

  while (value > gradeD) {
    gradeAmt += 10;
    gradeD += step;
  }
  if (gradeAmt >= 100) {
    gradeAmt = 100;
  }
  return gradeAmt;
}

// returns the stats of a member from DB
async function getMemberStats(memID) {
  let db = new Database();
  const q =
    "Select p.membershipID,p.DisplayName,SUM(c.playtime) as playtime, p.pvekd, sum(c.RaidClears) as raidclears, sum(c.strikecompletions) as strikecompletions, sum(c.nightfalls) as nightfalls, sum(publicevents) as publicevents, p.pvpkd, p.pvpWL, p.`CombatRatingPvP`,sum(c.trialswins)/sum(c.trialsmatches) as trialsRecord, p.triumphscore " +
    "from characters c , player p " +
    "where c.membershipID = " +
    memID +
    " AND p.membershipID = c.membershipID";
  let playerInfo = db.query(q);
  db.close();
  return playerInfo;
}

async function getLeaderboard(type){
  let db = new Database();
  let q;
  
  if(type == "PvEKD" || type == "PvPKD" || type == 'PvPWL' || type == "TriumphScore"){
    q = "select MembershipID, MembershipType, DisplayName,"+type +" from player order by  "+type+" DESC Limit 15";
    
   
  }
  else if(type== "Time" ){
    q = "select MembershipID, MembershipType, DisplayName, PVPTime+PVETime as Time from player order by  Time DESC Limit 15";
    
  }
  else if(type == "RaidClears" || type == "PublicEvents" || type =="StrikeCompletions" || type == "Nightfalls"){
    q = `select player.MemberShipID,MembershipType,DisplayName, typeQ.`+type+` from player,
    (select MembershipID, sum(`+type+`) as `+type+` from characters group by MembershipID) as typeQ
    where typeQ.MembershipID=player.MemberShipID
    order by `+type+` DESC
    Limit 15`;
  }
  else if(type == "Trials"){
    q = `select player.MemberShipID,MembershipType,DisplayName, typeQ.Trials from player,
    (select MembershipID, sum(trialsWins)/sum(trialsMatches) as Trials from characters group by MembershipID) as typeQ
    where typeQ.MembershipID=player.MemberShipID
    order by typeQ.Trials DESC
    Limit 15`;
  }
  else{
    throw new Error("Invalid type");
  }

  let leaderboard = db.query(q);
  db.close();
  return leaderboard;
}


module.exports = {
  searchPlayer,
  updatePlayer,
  getReportCard,
  getMemberStats,
  getLeaderboard
};
