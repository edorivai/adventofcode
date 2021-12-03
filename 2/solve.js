const fs = require("fs");

const file = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });
const commands = file.split('\n');
let horizontal = 0;
let depth = 0;
let aim = 0;

commands.forEach(command => {
  const [com, val] = command.split(' ');
  const parsedVal = Number(val);
  switch (com) {
    case "forward":
      horizontal += parsedVal;
      depth += parsedVal * aim;
    break;
    case "down":
      aim += parsedVal;
    break;
    case "up":
      aim -= parsedVal;
    break;
  }
});

console.log({
  horizontal,
  depth,
  multiplied: horizontal * depth
});