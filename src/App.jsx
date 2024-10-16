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
import { COLORS } from './utils/constants'
import './App.css'

const getPiece = ({ resourceType }) => {
  return {
    resourceType,
    color: COLORS.RESOURCES[resourceType],
  }
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

  const piecesShuffled = shuffle(pieces)

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
  console.log('grid', grid)

  return grid
}

function rollDice() {
  const randNum1 = Math.floor(Math.random() * 6) + 1
  const randNum2 = Math.floor(Math.random() * 6) + 1
  const results = [randNum1, randNum2]
  document.getElementById("dice1").src = `/dice${randNum1}.png`;
  document.getElementById("dice2").src = `/dice${randNum2}.png`;
  return results
}

export default function App() {
  const [resources, setResources] = useState(getInitialPieces())
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
    return getGrid(resources)
  }, [resources])

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
      <Box
        sx={{
          position: 'absolute',
          left: 20,
          top: 20,
          width: '90%',
          backgroundColor: colors.grey[900],
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          placeItems: 'center',
          padding: '5px 10px 5px 10px',
        }}
      >
        <Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={onShuffle}>
              shuffle
            </Button>
            <React.Fragment>
              <Button variant="outlined" onClick={handleClickOpen}>
                NEW GAME
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  console.log('clicking stuff')
                  onDiceRoll()
                }}
              >
                roll dice
              </Button>
              /* <Box>result {diceRolledResult}</Box> */
              <Box className="diceImages">
                <img id="dice1" class="dice" src="/dice6.png" alt="Dice 1"/>
                <img id="dice2" class="dice" src="/dice6.png" alt="Dice 2"/>                
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault()
                    const formData = new FormData(event.currentTarget)
                    const formJson = Object.fromEntries(formData.entries())
                    const email = formJson.email
                    console.log(email)
                    handleClose()
                  },
                }}
              >
                <DialogTitle>Start a New Game</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter the number of players
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="number"
                    name="number"
                    label="(1-4)"
                    type="integer"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Enter</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Stack>
        </Box>
        <Box>
          <PiecesToGrab />
        </Box>
      </Box>
      <div className="main">
        <div className="container row-1">
          {grid.row1.map((r, idx) => (
            <ResourceItem
              key={`row-1-col-${idx}`}
              resource={r}
              rowId={1}
              colId={idx}
            />
          ))}
        </div>
        <div className="container">
          {grid.row2.map((r, idx) => (
            <ResourceItem
              key={`row-2-col-${idx}`}
              resource={r}
              rowId={2}
              colId={idx}
            />
          ))}
        </div>
        <div className="container">
          {grid.row3.map((r, idx) => (
            <ResourceItem
              key={`row-3-col-${idx}`}
              resource={r}
              rowId={3}
              colId={idx}
            />
          ))}
        </div>
        <div className="container row-1">
          {grid.row4.map((r, idx) => (
            <ResourceItem
              key={`row-4-col-${idx}`}
              resource={r}
              rowId={4}
              colId={idx}
            />
          ))}
        </div>
        <div className="container">
          {grid.row5.map((r, idx) => (
            <ResourceItem
              key={`row-5-col-${idx}`}
              resource={r}
              rowId={5}
              colId={idx}
            />
          ))}
        </div>
      </div>
    </Box>
  )
}
