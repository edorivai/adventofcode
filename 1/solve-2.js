const fs = require("fs");

const file = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });
const depths = file.split('\n').map(Number);
const threeMeasurements = depths.map((first, index) => {
  if (index > depths.length - 3) return null;
  const second = depths[index + 1];
  const third = depths[index + 2];
  return first + second + third;
}).filter(x => x != null);
const increaseCount = threeMeasurements.reduce((count, curr, index) => {
  const prev = threeMeasurements[index - 1];
  if (prev && prev < curr) return count + 1;
  return count;
}, 0);
console.log('depths:', depths.length);
console.log('threes:', threeMeasurements.length);
console.log('increases:', increaseCount);
