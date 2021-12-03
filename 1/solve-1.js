const fs = require("fs");

const file = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });
const depths = file.split('\n').map(Number);
const increaseCount = depths.reduce((count, curr, index) => {
  const prev = depths[index - 1];
  if (prev && prev < curr) return count + 1;
  return count;
}, 0);
console.log('total:', depths.length);
console.log('increases:', increaseCount);
