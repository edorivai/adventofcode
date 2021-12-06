import fs from "fs";

// const file = fs.readFileSync(__dirname + "/input.txt.example", {
//   encoding: "utf-8",
// });
const file = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });
const lines = file.split("\n");
const binaryDigitLength = lines[0].length; // assume all binary numbers have the same length (with padded zeroes)

function findMostCommonBitAtIndex(index: number, lines: string[]) {
  const sumOfBitsAtIndex = lines.reduce(
    (total, line) => total + Number(line[index]),
    0
  );
  return Math.round(sumOfBitsAtIndex / lines.length);
}

// Part 1
const gamma = parseInt(
  Array.from({ length: binaryDigitLength })
    .map((_, i) => findMostCommonBitAtIndex(i, lines))
    .join(""),
  2
);
const flipper = Array.from({ length: binaryDigitLength })
  .map(() => "1")
  .join("");
const epsilon = gamma ^ parseInt(flipper, 2);

console.log("PART 1:");
console.log({
  gamma,
  epsilon,
  product: gamma * epsilon,
  g: gamma.toString(2),
  e: epsilon.toString(2),
});

function findLifeSupportRating(bitCriterium) {
  let remainingLines = lines.slice(0);
  let i = 0;
  while (remainingLines.length > 1 && i < binaryDigitLength) {
    const mostCommonBit = findMostCommonBitAtIndex(i, remainingLines);
    remainingLines = remainingLines.filter((line) =>
      bitCriterium(Number(line[i]), mostCommonBit)
    );
    i++;
  }
  return parseInt(remainingLines[0], 2);
}

const oxygen = findLifeSupportRating(
  (bit, mostCommonBit) => bit === mostCommonBit
);
const co2 = findLifeSupportRating(
  (bit, mostCommonBit) => bit !== mostCommonBit
);

console.log("\n");
console.log("PART 2:");
console.log({
  oxygen,
  co2,
  product: oxygen * co2,
});
