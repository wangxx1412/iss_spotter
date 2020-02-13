const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTime = data => {
  const getDateinfo = num => {
    const date = new Date(num * 1000);
    const dateStr = date.toString();
    return dateStr;
  };
  for (const el of data) {
    const dateStr = getDateinfo(el.risetime);
    console.log(`Next pass at ${dateStr} for ${el.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(data => {
    printPassTime(data);
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });
