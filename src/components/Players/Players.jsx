import { Paper, Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import { COLORS, devCardsTypes, piecesTypes } from '../../utils/constants'

function Player({
  player,
  curPlayerId,
  isLastPlayerItem,
  longestRoadPlayer,
  larsgestArmyPlayer,
}) {
  const { playerId, resources, devCards, color, pieces } = player

  const isActivePlayer = curPlayerId === playerId

  const playerPoints = useMemo(() => {
    let curPoints = 0
    if (longestRoadPlayer === playerId) {
      curPoints++
    }
    if (larsgestArmyPlayer === playerId) {
      curPoints++
    }

    const monopolyDevCardsPoints = devCards[devCardsTypes.monopoly]
    const piecesCount = Object.keys(pieces).reduce((prevCount, curPiece) => {
      // console.log('curPiece', curPiece)
      if (curPiece === piecesTypes.settlement) {
        return prevCount + pieces[curPiece] * 1
      } else if (curPiece === piecesTypes.city) {
        return prevCount + pieces[curPiece] * 2
      }
      return prevCount
    }, 0)

    const totalPoints = curPoints + monopolyDevCardsPoints + piecesCount

    return totalPoints
  }, [player.devCards])

  return (
    <Box
      key={player.playerId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        padding: '10px 10px 10px 10px',
        borderRadius: '10px',
        border: isActivePlayer ? '1px solid green' : 'none',
        backgroundColor: color,
        color: color === COLORS.TEAMS.white ? 'black' : 'inherit',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Player {player.playerId}</Typography>
        <Typography>Points {playerPoints}</Typography>
      </Box>

      <Box sx={{}}>resources</Box>
    </Box>
  )
}

export default function Players({
  players,
  longestRoadPlayer,
  larsgestArmyPlayer,
  curPlayerId,
}) {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {players.map((player, idx) => (
        <Player
          key={player.playerId}
          curPlayerId={curPlayerId}
          player={player}
          larsgestArmyPlayer={larsgestArmyPlayer}
          longestRoadPlayer={longestRoadPlayer}
          isLastPlayerItem={idx !== players.length - 1}
        />
      ))}
    </Paper>
  )
}
