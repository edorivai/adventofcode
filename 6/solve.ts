import fs from "fs";

// const filename = __dirname + "/input.txt.test";
const filename = __dirname + '/input.txt';
const file = fs.readFileSync(filename, { encoding: "utf-8" });

const counts = Array(9).fill(0);

file.split(',').map(Number).forEach(num => counts[num]++);

Array(256).fill(0).forEach((_, i) => {
  const spawners = counts.shift();
  counts.push(spawners);
  counts[6] += spawners;
});

console.log(counts);
console.log(counts.reduce((sum, v) => sum+v, 0));