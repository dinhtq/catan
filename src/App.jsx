import { useMemo, useState } from 'react'
import './App.css'
import { cloneDeep, shuffle } from 'lodash-es'
import { Box, Button } from '@mui/material'

const ROWS = 5
const COLS = 5

const TOTAL_PIECES = 19

const COLORS = {
  RESOURCES: {
    wood: '#1b5e20', // deep green
    brick: '#f44336', // red
    sheep: '#8bc34a', // lime
    ore: '#673ab7', // purple
    wheat: '#ffeb3b', // yellow
    robber: '#9e9e9e',
  },
}

const getPiece = ({ resourceType }) => {
  return {
    resourceType,
    color: COLORS.RESOURCES[resourceType],
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
    robber: 1,
  }

  const pieces = []

  Object.keys(count).forEach((resourceTypeKey) => {
    const resourceCount = count[resourceTypeKey]
    for (let i = 0; i < resourceCount; i++) {
      const piece = getPiece({ resourceType: resourceTypeKey })
      pieces.push(piece)
    }
  })
  console.log('pieces', pieces)
  const piecesShuffled = shuffle(pieces)
  console.log('piecesShuffled', piecesShuffled)

  return piecesShuffled
}

const getGrid = (pieces) => {
  const row1 = [] // len 3
  const row2 = [] // len 4
  const row3 = [] // len 5
  const row4 = [] // len 4
  const row5 = [] // len 3

  pieces.forEach((piece, idx) => {
    if (idx < 3) {
      row1.push(piece)
    } else if (idx < 7) {
      row2.push(piece)
    } else if (idx < 12) {
      row3.push(piece)
    } else if (idx < 16) {
      row4.push(piece)
    } else {
      row5.push(piece)
    }
  })
  const grid = {
    row1,
    row2,
    row3,
    row4,
    row5,
  }

  return grid
}

function ResourceItem({ resource }) {
  const { resourceType, color } = resource
  // console.log('reosuceType', resourceType)
  // console.log('color', color)
  const onCenterClicked = () => {
    console.log('onCenterClicked', onCenterClicked)
  }
  const onCornerClicked = () => {
    console.log('onCornerClicked', onCornerClicked)
  }
  return (
    <Box
      className="resource-item"
      sx={{ backgroundColor: color, position: 'relative' }}
    >
      <Box
        onClick={onCenterClicked}
        sx={{
          width: '70%',
          height: '40%',
          border: '1px dashed green',
          position: 'absolute',
          left: '15%',
          top: '30%',
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
        }}
      >
        {resourceType}
      </Box>
      <Box
        onClick={onCornerClicked}
        sx={{
          position: 'absolute',
          width: '10px',
          height: '30px',
          backgroundColor: 'white',
          clipPath: 'none',
          left: '20px',
          top: '5px',
          transform: 'rotate(60deg)',
        }}
      />
    </Box>
  )
}

export default function App() {
  const [resources, setResources] = useState(getInitialPieces())

  const grid = useMemo(() => {
    return getGrid(resources)
  }, [resources])

  const onShuffle = () => {
    setResources((prevResources) => {
      const prevResourcesCopy = cloneDeep(prevResources)
      const shuffled = shuffle(prevResourcesCopy)
      return shuffled
    })
  }

  return (
    <Box>
      <Box sx={{ position: 'absolute', left: 20, top: 20 }}>
        <Button variant="contained" onClick={onShuffle}>
          shuffle
        </Button>
      </Box>
      <div className="main">
        <div className="container row-1">
          {grid.row1.map((r, idx) => (
            <ResourceItem key={`row-1-col-${idx}`} resource={r} />
          ))}
          {/* {
            grid.row1.map((r, idx) => <Box key={`row-1-col-${idx}-box=${idx}`} sx={{ position: 'absolute', width: 20, height: 20, backgroundColor: 'white', clipPath: 'none', left: 0, top: 0 }} />)
          } */}
          <Box
            className="placement-area"
            sx={{
              position: 'absolute',
              width: `5`,
              height: 5,
              backgroundColor: 'white',
              clipPath: 'none',
              left: 0,
              top: 0,
            }}
          />
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
    </Box>
  )
}
