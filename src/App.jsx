import { useState } from "react";
import "./App.css";

const ROWS = 5;
const COLS = 5;

const gridItems = [
  {
    type: "wood",
    count: 4,
    bgColor: "#228B22",
  },
  {
    type: "sheep",
    count: 4,
    bgColor: "#2ecc71",
  },
  {
    type: "brick",
    count: 3,
    bgColor: "#e67e22",
  },
  {
    type: "ore",
    count: 3,
    bgColor: "#9b59b6",
  },
  {
    type: "wheat",
    count: 4,
    bgColor: "#f1c40f",
  },
  {
    type: "robber",
    count: 1,
    bgColor: "grey",
  },
];

const getGrid = () => {
  const grid = Array.from({ length: ROWS }).map((val, rowIndex) => {
    const columns = Array.from({ length: COLS }).map((_, colInd) => colInd);
    return columns;
  });
  console.log(grid);
  return grid;
};

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function assignCatanResources(pieces) {
  if (pieces.length !== 19) {
    throw new Error("The pieces array must have exactly 19 items.");
  }

  // Define the structure of the 2D array (5x5)
  const grid = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  // Predefined positions for where resources will go (19 positions in a hexagonal grid-like format)
  const positions = [
    [0, 2],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 2],
  ];

  // Shuffle the pieces array to randomize assignment
  const shuffledPieces = shuffle(positions);
  console.log("shuffledPieces", shuffledPieces);

  // Assign each piece to the predefined positions
  for (let i = 0; i < shuffledPieces.length; i++) {
    const position = positions[i];
    grid[position[0]][position[1]] = {
      resource: shuffledPieces[i],
      position: position,
    };
  }

  return grid;
}

const pieces = [
  "wood",
  "brick",
  "sheep",
  "wheat",
  "ore",
  "wood",
  "brick",
  "sheep",
  "wheat",
  "ore",
  "wood",
  "brick",
  "sheep",
  "wheat",
  "ore",
  "wood",
  "brick",
  "sheep",
  "robber",
];

// const result = assignCatanResources(pieces);
// console.log(result);

export default function App() {
  const TILES_COUNT = 19;
  return (
    <div className="App">
      <div className="main">
        <div className="container row-1">
          {Array.from({ length: 3 }).map(() => (
            <div />
          ))}
        </div>
        <div className="container">
          {Array.from({ length: 4 }).map(() => (
            <div />
          ))}
        </div>
        <div className="container">
          {Array.from({ length: 5 }).map(() => (
            <div />
          ))}
        </div>
        <div className="container row-1">
          {Array.from({ length: 4 }).map(() => (
            <div />
          ))}
        </div>
        <div className="container">
          {Array.from({ length: 3 }).map(() => (
            <div />
          ))}
        </div>
      </div>
    </div>
  );
}
