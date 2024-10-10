import { useMemo, useState } from 'react'
import { cloneDeep, shuffle } from 'lodash-es'
import { Box, Button, colors } from '@mui/material'
import Stack from '@mui/material/Stack'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import PiecesToGrab from './components/PiecesToGrab'
import ResourceItem from './components/ResourceItem/ResourceItem'
import { COLORS, tokens } from './utils/constants'
// import './App.css'
import Grid from './components/Grid/Grid'

const getGridResource = ({ resourceType }) => {
  return {
    resourceType,
    color: COLORS.RESOURCES[resourceType],
  }
}

const getInitialGridItems = () => {
  console.log('getInitialGridItems')

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

  console.log('gridItems', gridItems)

  const tokensItems = Object.keys(tokens).map((letter) => {
    return {
      letter,
      number: tokens[letter],
    }
  })
  console.log('tokensItems', tokensItems)

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

  console.log(combinedGridItems)

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

export default function App() {
  const [gridItems, setResources] = useState(getInitialGridItems())
  /*
    players = [
      {
        playerId: integer, // 1-4
        cards: []
      }
    ]
  */
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [players, setPlayers] = useState([])
  const [diceRolledResult, setDiceRolledResult] = useState([6, 6])

  const grid = useMemo(() => {
    return getGrid(gridItems)
  }, [gridItems])

  const onShuffle = () => {
    setResources((prevResources) => {
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

  return (
    <Box>
      <Grid />
    </Box>
  )
}
