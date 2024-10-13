import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material'
import { memo } from 'react'
import { GAME_PHASE } from '../../utils/constants'

const GameState = memo(
  function MyGameState({
    gamePhase,
    playerTurn,
    diceRolledResult,
    onGamePhaseChange,
  }) {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: 20,
          top: 20,
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Box>
          <FormControl fullWidth>
            <InputLabel id="game-phase-label">Game Phase</InputLabel>
            <Select
              labelId="game-phase-label"
              value={gamePhase}
              label="Game Phase"
              onChange={(e) => onGamePhaseChange(e.target.value)}
            >
              {Object.keys(GAME_PHASE).map((phase) => (
                <MenuItem key={phase} value={phase}>
                  {phase}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          Cur Player Turn: <Chip label={playerTurn} />
        </Box>
        <Box>
          Dice: <Chip label={diceRolledResult} />
        </Box>
      </Box>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.gamePhase === nextProps.gamePhase &&
      prevProps.playerTurn === nextProps.playerTurn &&
      prevProps.diceRolledResult === nextProps.diceRolledResult
    )
  },
)

export default GameState
