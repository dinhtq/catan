import { useMemo, useState } from "react";
import "./App.css";
import { cloneDeep, shuffle } from "lodash-es";

const ROWS = 5;
const COLS = 5;

const TOTAL_PIECES = 19

const COLORS = {
  RESOURCES: {
    wood: '#1b5e20', // deep green
    brick: '#f44336', // red
    sheep: '#cddc39', // lime
    ore: '#673ab7', // purple
    wheat: '#ffeb3b', // yellow
    robber: '#9e9e9e',
  }
}

const getPiece = ({ resourceType }) => {
  return {
    resourceType,
    color:  COLORS.RESOURCES[resourceType]
  }
}

const piceTypes = {
  wood: 'wood',
  brick: 'brick',
  sheep: 'sheep',
  ore: 'ore',
  wheat: 'wheat',
  robber: 'robber',

}

const getInitialPieces = () => {
  const count = {
    wood: 4,
    brick: 3,
    sheep: 4,
    ore: 3,
    wheat: 4,
    robber: 1
  }

  const pieces = []
  

  Object.keys(count).forEach((resourceTypeKey) => {
    const resourceCount = count[resourceTypeKey]
    for(let i = 0; i< resourceCount; i++) {
      const piece = getPiece({ resourceType: resourceTypeKey })
      pieces.push(piece)
    }
  })
  console.log('pieces', pieces)
  const piecesShuffled = shuffle(pieces)
  console.log('piecesShuffled', piecesShuffled)

  return [
    'wood',
    'brick',
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
