import { Button, Box } from '@mui/material'
import { memo, useRef } from 'react'
import ReactDice from 'react-dice-complete'
import { GAME_PHASE } from '../../utils/constants'

function Dice({ gamePhase, onDiceChanged }) {
  const ref = useRef(null)

  const rollDone = (totalValue, values) => {
    onDiceChanged(totalValue)
  }
  const rollAll = () => {
    ref.current?.rollAll()
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={rollAll}
        disabled={gamePhase !== GAME_PHASE.INIT_PLAYER_TURN_ROLL_DICE}
      >
        Roll Dice
      </Button>
      <ReactDice
        numDice={2}
        ref={ref}
        rollDone={rollDone}
        faceColor="white"
        dotColor="black"
      />
    </Box>
  )
}

export default memo(Dice)
