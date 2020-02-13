const rp = require("request-promise-native");

const fetchMyIP = () => {
  return rp("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return rp(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return rp(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(body => fetchCoordsByIP(body))
    .then(body => fetchISSFlyOverTimes(body))
    .then(body => {
      return JSON.parse(body).response;
    });
};

module.exports = { nextISSTimesForMyLocation };
