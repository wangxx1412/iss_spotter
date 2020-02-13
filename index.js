const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  const getDateinfo = num => {
    const date = new Date(num * 1000);
    const dateStr = date.toString();
    return dateStr;
  };
  for (const el of passTimes) {
    const dateStr = getDateinfo(el.risetime);
    console.log(`Next pass at ${dateStr} for ${el.duration} seconds!`);
  }
});
