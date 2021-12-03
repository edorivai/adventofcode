const fs = require("fs");

const file = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });
const lines = file.split("\n")
const binaryDigitLength = lines[0].length; // assume all binary numbers have the same length (with padded zeroes)
const gamma = parseInt(Array.from({ length: binaryDigitLength }).map((_, i) => {
  const sumOfBitsAtIndex = lines.reduce(
    (total, line) => total + Number(line[i]),
    0
  );
  return Math.round(sumOfBitsAtIndex / lines.length);
}).join(''), 2);
const flipper = Array.from({ length: binaryDigitLength }).map(() => "1").join('');
const epsilon = gamma ^ parseInt(flipper, 2);

console.log({ gamma, epsilon, product: gamma * epsilon, g: gamma.toString(2), e: epsilon.toString(2) });
