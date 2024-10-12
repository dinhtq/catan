import { Button, Box } from '@mui/material'
import { memo, useRef } from 'react'
import ReactDice from 'react-dice-complete'

function Dice({ onDiceChanged }) {
  const ref = useRef(null)

  const rollDone = (totalValue, values) => {
    onDiceChanged(totalValue)
  }
  const rollAll = () => {
    ref.current?.rollAll()
  }

  return (
    <Box>
      <Button variant="contained" onClick={rollAll}>
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
