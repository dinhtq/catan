import { useMemo, useState } from 'react'
import { cloneDeep, shuffle } from 'lodash-es'
import { Box } from '@mui/material'

import {
  COLORS,
  devCardsTypes,
  GAME_PHASE,
  resourcesTypes,
  tokens,
} from './utils/constants'
// import './App.css'
import GridHex from './components/Grid/GridHex'

const getGridResource = ({ resourceType }) => {
  return {
    resourceType,
    color: COLORS.RESOURCES[resourceType],
  }
}

const getInitialGridItems = () => {
  //console.log('getInitialGridItems')

  const gridItemsCount = {
    wood: 4,
    brick: 3,
    sheep: 4,
    ore: 3,
    wheat: 4,
  }

  const gridItems = []
  Object.keys(gridItemsCount).forEach((resourceTypeKey) => {
    const resourceCount = gridItemsCount[resourceTypeKey]
    for (let i = 0; i < resourceCount; i++) {
      const gridItem = getGridResource({ resourceType: resourceTypeKey })
      gridItems.push(gridItem)
    }
  })

  //console.log('gridItems', gridItems)

  const tokensItems = Object.keys(tokens).map((letter) => {
    return {
      letter,
      number: tokens[letter],
    }
  })
  //console.log('tokensItems', tokensItems)

  const tokensItemsShuffled = shuffle(tokensItems)
  const gridItemsShuffled = shuffle(gridItems)

  const combinedGridItems = gridItemsShuffled.map((gridItem, idx) => ({
    ...gridItem,
    ...tokensItemsShuffled[idx],
  }))

  // add robber to final
  combinedGridItems.push({
    ...getGridResource({ resourceType: 'robber' }),
  })

  //console.log(combinedGridItems)

  return combinedGridItems
}

const getGrid = (gridItems) => {
  const row1 = [] // len 3
  const row2 = [] // len 4
  const row3 = [] // len 5
  const row4 = [] // len 4
  const row5 = [] // len 3

  gridItems.forEach((gridItem, idx) => {
    if (idx < 3) {
      row1.push(gridItem)
    } else if (idx < 7) {
      row2.push(gridItem)
    } else if (idx < 12) {
      row3.push(gridItem)
    } else if (idx < 16) {
      row4.push(gridItem)
    } else {
      row5.push(gridItem)
    }
  })
  const grid = {
    row1,
    row2,
    row3,
    row4,
    row5,
  }
  // console.log('grid', grid)

  return grid
}

function rollDice() {
  const randNum1 = Math.floor(Math.random() * 6) + 1
  const randNum2 = Math.floor(Math.random() * 6) + 1
  const results = [randNum1, randNum2]
  return results
}

function getInitialPlayers({ totalPlayersCount }) {
  const teamColors = Object.keys(COLORS.TEAMS)
  const teamColorsShuffled = shuffle(teamColors)
  let curTeamColorIdx = 0
  const players = Array.from({ length: totalPlayersCount }).map((_, idx) => {
    const playerColor = teamColorsShuffled[curTeamColorIdx]
    curTeamColorIdx++
    return {
      playerId: idx + 1,
      resources: {
        [resourcesTypes.brick]: 0,
        [resourcesTypes.ore]: 0,
        [resourcesTypes.sheep]: 0,
        [resourcesTypes.wheat]: 0,
        [resourcesTypes.wood]: 0,
      },
      developmentCards: {
        [devCardsTypes.knight]: 0,
        [devCardsTypes.monopoly]: 0,
        [devCardsTypes.roadBuilding]: 0,
        [devCardsTypes.victory]: 0,
        [devCardsTypes.yearOfPlenty]: 0,
      },
      color: playerColor,
    }
  })
  return players
}

export default function App() {
  const [gridItems, setGridItems] = useState(getInitialGridItems())
  /*
    players = [
      {
        playerId: integer, // 1-4
        cards: []
      }
    ]
  */
  const [open, setOpen] = useState(false)

  // testing - after INIT_NEW_GAME, now initial players settlements and roads placements
  const [gamePhase, setGamePhase] = useState(GAME_PHASE.INIT_PLAYER_TURN)
  const [playerTurn, setPlayerTurn] = useState(1)
  const [players, setPlayers] = useState(
    getInitialPlayers({ totalPlayersCount: 4 }),
  )
  const [diceRolledResult, setDiceRolledResult] = useState([6, 6])

  const grid = useMemo(() => {
    return getGrid(gridItems)
  }, [gridItems])

  const onShuffle = () => {
    setGridItems((prevResources) => {
      const prevResourcesCopy = cloneDeep(prevResources)
      const shuffled = shuffle(prevResourcesCopy)
      return shuffled
    })
  }

  const onDiceRoll = () => {
    setDiceRolledResult(() => {
      const rolledResult = rollDice()
      return rolledResult
    })
  }

  console.log('players', players)
  console.log('grid', grid)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
      }}
    >
      <Box id="grid-container">
        <Box sx={{ display: 'flex', placeContent: 'center' }}>
          {grid.row1.map((resource, idx) => {
            return (
              <GridHex
                key={idx}
                resource={resource}
                rowId={1}
                colId={idx}
                isLastHex={idx === grid.row1.length - 1}
              />
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', placeContent: 'center' }}>
          {grid.row2.map((resource, idx) => {
            return (
              <GridHex
                key={idx}
                resource={resource}
                rowId={2}
                colId={idx}
                isLastHex={idx === grid.row2.length - 1}
              />
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', placeContent: 'center' }}>
          {grid.row3.map((resource, idx) => {
            return (
              <GridHex
                key={idx}
                resource={resource}
                rowId={3}
                colId={idx}
                isLastHex={idx === grid.row3.length - 1}
              />
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', placeContent: 'center' }}>
          {grid.row4.map((resource, idx) => {
            return (
              <GridHex
                key={idx}
                resource={resource}
                rowId={4}
                colId={idx}
                isLastHex={idx === grid.row4.length - 1}
              />
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', placeContent: 'center' }}>
          {grid.row5.map((resource, idx) => {
            return (
              <GridHex
                key={idx}
                resource={resource}
                rowId={5}
                colId={idx}
                isLastHex={idx === grid.row5.length - 1}
                isLastRow
              />
            )
          })}
        </Box>
      </Box>
      {/* <Grid /> */}
    </Box>
  )
}
