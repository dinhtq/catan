import { useEffect, useMemo, useState } from 'react'
import { cloneDeep, flatten, shuffle } from 'lodash-es'
import { Box, Button, Chip } from '@mui/material'

import {
  COLORS,
  devCardsTypes,
  GAME_PHASE,
  piecesTypes,
  resourcesTypes,
  tokens,
} from './utils/constants'
// import './App.css'
import GridHex from './components/Grid/GridHex'
import Players from './components/Players/Players'
import Dice from './components/Dice/Dice'

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

function getInitialPlayers({ totalPlayersCount }) {
  const teamColors = Object.keys(COLORS.TEAMS)
  const teamColorsShuffled = shuffle(teamColors)
  let curTeamColorIdx = 0
  const players = Array.from({ length: totalPlayersCount }).map((_, idx) => {
    const playerColor = COLORS.TEAMS[teamColorsShuffled[curTeamColorIdx]]
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
      devCards: {
        [devCardsTypes.knight]: 0,
        [devCardsTypes.monopoly]: 0,
        [devCardsTypes.roadBuilding]: 0,
        [devCardsTypes.victory]: 0,
        [devCardsTypes.yearOfPlenty]: 0,
      },
      // player's roads, settlements and cities, [{ pieceType: 'settlement', posRowId: 1, posColId: 1, position: 'left' }]
      pieces: {
        [piecesTypes.settlement]: 0,
        [piecesTypes.city]: 0,
        [piecesTypes.road]: 0,
      },
      color: playerColor,
    }
  })
  return players
}

function getColObj({ resourceType }) {
  return {
    top: resourceType,
    topLeft: resourceType,
    topRight: resourceType,
    botLeft: resourceType,
    bottom: resourceType,
    botRight: resourceType,
  }
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
  const [gamePhase, setGamePhase] = useState(
    GAME_PHASE.INIT_PLAYER_TURN_ROLL_DICE,
  )
  const [playerTurn, setPlayerTurn] = useState(1)
  // settlement, city or road
  const [selectedPlayerBuildingType, setSelectedPlayerBuildingType] = useState(
    piecesTypes.road,
  )
  const [players, setPlayers] = useState(
    getInitialPlayers({ totalPlayersCount: 4 }),
  )
  const [diceRolledResult, setDiceRolledResult] = useState(undefined)
  const [larsgestArmyPlayer, setLarsgestArmyPlayer] = useState(undefined)
  const [longestRoadPlayer, setLongestRoadPlayer] = useState(undefined)
  /*
    {
      1: [{
          pieceType: 'settlement',
          colKey,
          rowKey,
          placement: 'bottom'
          playerTeamColor
        }]
    }
  */
  const [playersPiecesAndPositions, setPlayersPiecesAndPositions] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  })

  // TODO: rename piecesPlacementsMap to buildingsPlacementsResourcesMap
  const { grid, piecesPlacementsMap } = useMemo(() => {
    const g = getGrid(gridItems)
    const piecesPlacementsMap = {}

    Object.keys(g).forEach((rowKey) => {
      const rowCols = g[rowKey]
      rowCols.forEach((resource, colIdx) => {
        const colKey = `col${colIdx + 1}`
        piecesPlacementsMap[rowKey] = {
          ...piecesPlacementsMap[rowKey],
          [colKey]: {
            ...getColObj({ resourceType: resource.resourceType }),
            data: { ...resource },
          },
        }
      })
    })

    return { grid: g, piecesPlacementsMap }
  }, [gridItems])

  const onShuffle = () => {
    setGridItems((prevResources) => {
      const prevResourcesCopy = cloneDeep(prevResources)
      const shuffled = shuffle(prevResourcesCopy)
      return shuffled
    })
  }

  const handleBuildingPlacement = ({ placement, colId, rowId }) => {
    console.log('***** handleBuildingPlacement')
    console.log('rowId', rowId)
    console.log('colId', colId)
    /* update piecesPositionsAndResources */
    // get resources surrounding the position
    //const resourceType = piecesPlacementsMap[rowId][colId][placement]
    setPlayersPiecesAndPositions((prev) => {
      const prevCopy = cloneDeep(prev)
      // check if building position (row, col, placement) is taken
      const prevCopyValuesFlattened = flatten(Object.values(prevCopy))
      console.log('prevCopyValuesFlattened', prevCopyValuesFlattened)
      const alreadyTaken = prevCopyValuesFlattened.find(
        (i) =>
          i.colKey === colId && i.rowKey === rowId && i.placement === placement,
      )
      console.log('alreadyTaken', alreadyTaken)
      if (!alreadyTaken) {
        const newPiece = {
          pieceType: selectedPlayerBuildingType,
          colKey: colId,
          rowKey: rowId,
          placement,
          playerTeamColor: players.find((p) => p.playerId === playerTurn).color,
        }
        prevCopy[playerTurn].push(newPiece)
      }
      return prevCopy
    })
    /* update players pieces */
    setPlayers((prevPlayers) => {
      const prevPlayersCopy = cloneDeep(prevPlayers)
      const foundPlayer = prevPlayersCopy.find(
        (player) => player.playerId === playerTurn,
      )
      foundPlayer.pieces[selectedPlayerBuildingType]++
      return prevPlayersCopy
    })
  }

  const handleRoadPlacement = ({ placement, colId, rowId }) => {
    /* update piecesPositionsAndResources */
    setPlayersPiecesAndPositions((prev) => {
      const prevCopy = cloneDeep(prev)
      // check if building position (row, col, placement) is taken
      const prevCopyValuesFlattened = flatten(Object.values(prevCopy))
      const alreadyTaken = prevCopyValuesFlattened.find(
        (i) =>
          i.colKey === colId && i.rowKey === rowId && i.placement === placement,
      )
      if (!alreadyTaken) {
        const newPiece = {
          pieceType: selectedPlayerBuildingType,
          colKey: colId,
          rowKey: rowId,
          placement,
          playerTeamColor: players.find((p) => p.playerId === playerTurn).color,
        }
        prevCopy[playerTurn].push(newPiece)
      }
      return prevCopy
    })
    // update player road count
    setPlayers((prevPlayers) => {
      const prevPlayersCopy = cloneDeep(prevPlayers)
      const foundPlayer = prevPlayersCopy.find(
        (player) => player.playerId === playerTurn,
      )
      foundPlayer.pieces[selectedPlayerBuildingType]++
      return prevPlayersCopy
    })
  }

  // console.log('players', players)
  // console.log('grid', grid)
  // console.log('piecesPlacementsMap', piecesPlacementsMap)

  // useEffect(() => {
  //   console.log('players', players)
  // }, [players])

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 10,
            top: 10,
            display: 'flex',
            gap: '1rem',
          }}
        >
          <Box>
            Game Phase: <Chip label={gamePhase} />
          </Box>
          <Box>
            Cur Player Turn: <Chip label={playerTurn} />
          </Box>
          <Box>
            Dice: <Chip label={diceRolledResult} />
          </Box>
        </Box>
        <Box id="grid-container">
          <Box sx={{ display: 'flex', placeContent: 'center' }}>
            {grid.row1.map((resource, idx) => {
              const rowKey = 'row1'
              const colKey = `col${idx + 1}`
              return (
                <GridHex
                  key={idx}
                  resource={resource}
                  rowId={rowKey}
                  colId={colKey}
                  isLastHex={idx === grid.row1.length - 1}
                  onBuildingPlacement={handleBuildingPlacement}
                  onRoadPlacementClicked={({ placement }) =>
                    handleRoadPlacement({
                      placement,
                      rowId: rowKey,
                      colId: colKey,
                    })
                  }
                  playersPiecesAndPositions={playersPiecesAndPositions}
                />
              )
            })}
          </Box>
          <Box sx={{ display: 'flex', placeContent: 'center' }}>
            {grid.row2.map((resource, idx) => {
              const rowKey = 'row2'
              const colKey = `col${idx + 1}`
              return (
                <GridHex
                  key={idx}
                  resource={resource}
                  rowId={rowKey}
                  colId={colKey}
                  isLastHex={idx === grid.row2.length - 1}
                  onRoadPlacementClicked={({ placement }) =>
                    handleRoadPlacement({
                      placement,
                      rowId: rowKey,
                      colId: colKey,
                    })
                  }
                  onBuildingPlacement={handleBuildingPlacement}
                  playersPiecesAndPositions={playersPiecesAndPositions}
                />
              )
            })}
          </Box>
          <Box sx={{ display: 'flex', placeContent: 'center' }}>
            {grid.row3.map((resource, idx) => {
              const rowKey = 'row3'
              const colKey = `col${idx + 1}`
              return (
                <GridHex
                  key={idx}
                  resource={resource}
                  rowId={rowKey}
                  colId={colKey}
                  isLastHex={idx === grid.row3.length - 1}
                  onRoadPlacementClicked={({ placement }) =>
                    handleRoadPlacement({
                      placement,
                      rowId: rowKey,
                      colId: colKey,
                    })
                  }
                  onBuildingPlacement={handleBuildingPlacement}
                  playersPiecesAndPositions={playersPiecesAndPositions}
                />
              )
            })}
          </Box>
          <Box sx={{ display: 'flex', placeContent: 'center' }}>
            {grid.row4.map((resource, idx) => {
              const rowKey = 'row4'
              const colKey = `col${idx + 1}`
              return (
                <GridHex
                  key={idx}
                  resource={resource}
                  rowId={rowKey}
                  colId={colKey}
                  isLastHex={idx === grid.row4.length - 1}
                  onRoadPlacementClicked={({ placement }) =>
                    handleRoadPlacement({
                      placement,
                      rowId: rowKey,
                      colId: colKey,
                    })
                  }
                  onBuildingPlacement={handleBuildingPlacement}
                  playersPiecesAndPositions={playersPiecesAndPositions}
                />
              )
            })}
          </Box>
          <Box sx={{ display: 'flex', placeContent: 'center' }}>
            {grid.row5.map((resource, idx) => {
              const rowKey = 'row5'
              const colKey = `col${idx + 1}`
              return (
                <GridHex
                  key={idx}
                  resource={resource}
                  rowId={rowKey}
                  colId={colKey}
                  isLastHex={idx === grid.row5.length - 1}
                  isLastRow
                  onRoadPlacementClicked={({ placement }) =>
                    handleRoadPlacement({
                      placement,
                      rowId: rowKey,
                      colId: colKey,
                    })
                  }
                  onBuildingPlacement={handleBuildingPlacement}
                  playersPiecesAndPositions={playersPiecesAndPositions}
                />
              )
            })}
          </Box>
        </Box>
      </Box>
      <Box
        id="players"
        sx={{
          flex: 1,
          margin: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <Players
          curPlayerId={playerTurn}
          players={players}
          longestRoadPlayer={longestRoadPlayer}
          larsgestArmyPlayer={larsgestArmyPlayer}
        />
        <Box>
          <Dice
            gamePhase={gamePhase}
            onDiceChanged={(diceResult) => {
              console.log('diceResult', diceResult)
              setDiceRolledResult(diceResult)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
