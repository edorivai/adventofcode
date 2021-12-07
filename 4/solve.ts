import fs from "fs";

// const filename = __dirname + "/input.txt.test";
const filename = __dirname + '/input.txt';
const file = fs.readFileSync(filename, { encoding: "utf-8" });
const chunks = file.split("\n\n");
const remainingNumbers = chunks[0].split(",").map(Number);
let remainingBoards = chunks
  .slice(1)
  .map((b) =>
    b.split("\n").map((row) => row.split(/\s+/).filter(Boolean).map(Number))
  );

function resolveRound() {
  const num = remainingNumbers.shift();
  const winningBoards = remainingBoards.filter((board) =>
    board.some((row) => {
      const match = row.some((value, colIndex) => {
        if (value !== num) return false;
        row[colIndex] = null;
        return true;
      });
      if (!match) return false;

      // determine board wins
      return (
        // rows
        determineBoardWinsAlongAxis(board) ||
        // columns
        determineBoardWinsAlongAxis(transpose(board))
      );
    })
  );
  return winningBoards;
}

let round = 0;
let drawnNumber: number;
function tick() {
  console.log("STARTING ROUND", ++round);
  // console.log("drawn numbers remaining");
  // console.log(drawnNumbers);
  console.log("drawn number");
  drawnNumber = remainingNumbers[0];
  console.log(drawnNumber);
  const winners = resolveRound();
  // console.log("boards after round");
  // console.log(boards);
  winners.forEach(winner => {
    console.log("WINNER!");
    console.log(winner);

    const sumOfRemainingNumbers = sum(
      winner.map((row) => sum(row.filter(Boolean)))
    );
    console.log("Winner score:", sumOfRemainingNumbers * drawnNumber);
  });

  // Remove winning boards
  remainingBoards = remainingBoards.filter(board => !winners.includes(board));
}

while (remainingBoards.length > 0 && remainingNumbers.length > 0) {
  tick();
}

function sum(numbers: number[]) {
  return numbers.reduce((sum, value) => sum + value, 0);
}

function determineBoardWinsAlongAxis(board: (number | null)[][]) {
  return board.some((row) => row.every((cell) => cell === null));
}

function transpose<T = unknown>(matrix: T[][]) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
