import fs from "fs";

// const filename = __dirname + "/input.txt.test";
const filename = __dirname + '/input.txt';
const file = fs.readFileSync(filename, { encoding: "utf-8" });
const lines = file.split("\n").map((rawLine) => {
  const [[x1, y1], [x2, y2]] = rawLine
    .split(" -> ")
    .map((p) => p.split(",").map(Number));
  return { x1, y1, x2, y2 };
});

const mapSize = 1000;
const map = Array(mapSize)
  .fill(0)
  .map(() => Array(mapSize).fill(0) as number[]);

// const horizVertLines = lines.filter(({x1, x2, y1, y2}) => x1 === x2 || y1 === y2);

// horizVertLines.forEach(({ x1, y1, x2, y2 }) => {
//   const xmin = Math.min(x1, x2);
//   const xmax = Math.max(x1, x2);
//   const ymin = Math.min(y1, y2);
//   const ymax = Math.max(y1, y2);
//   for (let x = xmin; x <= xmax; x++) {
//     for (let y = ymin; y <= ymax; y++) {
//       map[y][x]++;
//     }
//   }
// });

// part 2
// const diagonalLines = lines.filter(l => !horizVertLines.includes(l));
lines.forEach(({ x1, y1, x2, y2 }) => {
  const dx = (x2 - x1) / Math.abs(x2 - x1) || 0;
  const dy = (y2 - y1) / Math.abs(y2 - y1) || 0;
  let x = x1;
  let y = y1;
  while (x !== x2 || y !== y2) {
    map[y][x]++;
    x += dx;
    y += dy;
  }
  map[y][x]++;
});

// console.log(horizVertLines);
// printMap(map);
console.log(
  "Points with 2 or more lines overlapping:",
  map.flat().filter((count) => count > 1).length
);

function printMap(map: number[][]) {
  map.forEach((row) => {
    console.log(row.join("").replace(/0/g, "."));
  });
}
