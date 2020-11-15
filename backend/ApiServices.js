var apiKey = "e9c7d4bb05944ed7a72f8d69aab9f595";

const axios = require("axios");

//returns an list of players with matching display names from destiny api based off parameter: name
function findPlayer(name) {
  let path =
    "https://www.bungie.net/platform/Destiny2/SearchDestinyPlayer/-1/" +
    name +
    "/";
  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}
//returns the profile of a player dependent on a member id
function findProfile(memID, memType) {
  let path =
    "https://www.bungie.net/Platform/Destiny2/" +
    memType +
    "/Profile/" +
    memID +
    "/?components=100";
  console.log(path);
  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}
//returns detailed account level stats of a player given membershipID and membership type
function getPlayerStats(memID, memType) {
  let path =
    "https://www.bungie.net/platform/Destiny2/" +
    memType +
    "/Account/" +
    memID +
    "/Stats/";
  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}

//returns a promise that has triumph records for given memID and memType
function getRecords(memID, memType) {
  let path =
    "https://www.bungie.net/Platform/Destiny2/" +
    memType +
    "/Profile/" +
    memID +
    "/?components=900";
  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}

//returns character stats
function getCharacterStats(memID, memType, charID) {
  let path =
    "https://www.bungie.net/platform/Destiny2/" +
    memType +
    "/Account/" +
    memID +
    "/Character/" +
    charID +
    "/Stats/";

  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}

//returns info on a character such as light, emblem
function getCharacterInfo(memID, memType, charID) {
  let path =
    "https://www.bungie.net/platform/Destiny2/" +
    memType +
    "/Profile/" +
    memID +
    "/Character/" +
    charID +
    "/?components=200";

  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}

//returns the scored nightfall info for a character
function getCharacterNightfall(memID, memType, charID) {
  let path =
    "https://www.bungie.net/platform/Destiny2/" +
    memType +
    "/Account/" +
    memID +
    "/Character/" +
    charID +
    "/Stats/?modes=46";
  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}

function getCharacterTrials(memID, memType, charID) {
  let path =
    "https://www.bungie.net/platform/Destiny2/" +
    memType +
    "/Account/" +
    memID +
    "/Character/" +
    charID +
    "/Stats/?modes=84";
  return axios({
    method: "get",
    url: path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-API-Key": apiKey,
    },
  });
}

module.exports = {
  findProfile,
  findPlayer,
  getPlayerStats,
  getRecords,
  getCharacterStats,
  getCharacterInfo,
  getCharacterNightfall,
  getCharacterTrials,
};
