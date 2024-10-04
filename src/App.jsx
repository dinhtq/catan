import { useMemo, useState } from "react";
import "./App.css";
import { cloneDeep, shuffle } from "lodash-es";

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

const getInitialPieces = () => {
  return [
    "wood",
    "brick",
    "sheep",
    "wheat", // row 1, idx 3
    "ore",
    "wood",
    "brick",
    "sheep", // row 2, idx 7
    "wheat",
    "ore",
    "wood",
    "brick",
    "sheep", // row 3, idx 12
    "wheat",
    "ore",
    "wood", // row 4, 15
    "brick",
    "sheep",
    "robber",
  ];
};

const getGrid = (pieces) => {
  const row1 = []; // len 3
  const row2 = []; // len 4
  const row3 = []; // len 5
  const row4 = []; // len 4
  const row5 = []; // len 3

  pieces.forEach((piece, idx) => {
    if (idx < 3) {
      row1.push(piece);
    } else if (idx < 7) {
      row2.push(piece);
    } else if (idx < 12) {
      row3.push(piece);
    } else if (idx < 16) {
      row4.push(piece);
    } else {
      row5.push(piece);
    }
  });
  const grid = {
    row1,
    row2,
    row3,
    row4,
    row5,
  };

  return grid;
};

// const result = assignCatanResources(pieces);
// console.log('pieces length', pieces.length);

function ResourceItem({ resource }) {
  return <div>{resource}</div>;
}

export default function App() {
  const resources = getInitialPieces()

  const grid = useMemo(() => {
    return getGrid(resources)
  }, [resources])

  return (
    <div className="App">
      <div className="main">
        <div className="container row-1">
          {grid.row1.map((r, idx) => (
            <ResourceItem key={`row-1-col-${idx}`} resource={r} />
          ))}
        </div>
        <div className="container">
          {grid.row2.map((r, idx) => (
            <ResourceItem key={`row-2-col-${idx}`} resource={r} />
          ))}
        </div>
        <div className="container">
          {grid.row3.map((r, idx) => (
            <ResourceItem key={`row-3-col-${idx}`} resource={r} />
          ))}
        </div>
        <div className="container row-1">
          {grid.row4.map((r, idx) => (
            <ResourceItem key={`row-4-col-${idx}`} resource={r} />
          ))}
        </div>
        <div className="container">
          {grid.row5.map((r, idx) => (
            <ResourceItem key={`row-5-col-${idx}`} resource={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
