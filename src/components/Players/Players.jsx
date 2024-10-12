import { Paper, Box, Typography, colors } from '@mui/material'
import { OtherHouses as SettlementIcon } from '@mui/icons-material'
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

  const style = useMemo(() => {
    let sty = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem',
      //padding: '10px 10px 10px 10px',
      borderRadius: '10px',
      border: isActivePlayer ? '1px solid green' : 'none',
      backgroundColor: color,
      color: color === COLORS.TEAMS.white ? 'black' : 'inherit',
      position: 'relative',
    }
    if (isActivePlayer) {
      sty = {
        ...sty,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          //background: #fff;
          //background: 'red',
          zIndex: -1,
          //border: '1px solid yellow',
          background: 'linear-gradient(235deg, #89ff00, #010615, #00bcd4)',
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          //background: '#fff',
          zIndex: -2,
          filter: 'blur(13px)',
          background: 'linear-gradient(235deg, #89ff00, #010615, #00bcd4)',
        },
      }
    }
    return sty
  }, [isActivePlayer])

  return (
    <Box key={player.playerId} sx={style}>
      <Box sx={{ position: 'relative', zIndex: 2, backgroundColor: color }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Player {player.playerId}</Typography>
          <Typography>Points {playerPoints}</Typography>
        </Box>

        <Box sx={{}}>
          <SettlementIcon fontSize="large" />
        </Box>
      </Box>
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
