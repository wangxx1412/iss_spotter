const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, function(
    error,
    response,
    body
  ) {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`,
    function(error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      //JSON.parse(body).data;
      callback(null, JSON.parse(body).response);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((err, ip) => {
    if (err) {
      console.log("It didn't work!", err);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log("Fetch Coords didn't work", err);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) {
          console.log("Fetch ISS time didn't work", err);
          return;
        }
        callback(null, data);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
