import fs from "fs";

// const filename = __dirname + "/input.txt.test";
const filename = __dirname + '/input.txt';
const file = fs.readFileSync(filename, { encoding: "utf-8" });

const positions = file.split(',').map(Number);
// Start at the average position
let target = Math.round(positions.reduce((sum, v) => sum + v, 0) / positions.length);
let targetCost = calculateCost2(target);

while (true) {
  // Ease towards optimum
  if (probe(target - 1)) continue;
  if (probe(target + 1)) continue;
  break;
}

function probe(position) {
  const positionCost = calculateCost2(position);
  if (positionCost < targetCost) {
    target = position;
    targetCost = positionCost;
    return true;
  }
  return false;
}

function calculateCost1(position) {
  return positions.reduce((sumOfFuel, pos) => sumOfFuel + Math.abs(pos - position), 0);
}
function calculateCost2(position) {
  return positions.reduce((sumOfFuel, pos) => {
    const dist = Math.abs(pos - position);
    return sumOfFuel + (dist * ((dist - 1) / 2 + 1));
  }, 0);
}

console.log({
  target,
  targetCost
});