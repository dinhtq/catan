import { colors } from '@mui/material'

export const TOTAL_PIECES = 19

export const GAME_PHASE = {
  INIT_NEW_GAME: 'INIT_NEW_GAME',
  INIT_PLAYER_TURN: 'INIT_PLAYER_TURN',
  INIT_PLAYER_TURN_BUILD: 'INIT_PLAYER_TURN_BUILD',
  INIT_PLAYER_TURN_ROLL_DICE: 'INIT_PLAYER_TURN_ROLL_DICE',
  INIT_PLAYER_TURN_DISTRIBUTION: 'INIT_PLAYER_TURN_DISTRIBUTION',
  STARTED_PLAYER_TURN: 'PLAYER_TURN',
  GAME_OVER: 'GAME_OVER',
}

export const resourcesTypes = {
  wood: 'wood',
  brick: 'brick',
  sheep: 'sheep',
  ore: 'ore',
  wheat: 'wheat',
}

export const piecesTypes = {
  road: 'road',
  settlement: 'settlement',
  city: 'city',
}

export const devCardsTypes = {
  knight: 'knight',
  victory: 'victory',
  roadBuilding: 'roadBuilding',
  yearOfPlenty: 'yearOfPlenty',
  monopoly: 'monopoly',
}

export const devCardsCount = {
  [devCardsTypes.knight]: 14,
  [devCardsTypes.victory]: 5,
  [devCardsTypes.roadBuilding]: 2,
  [devCardsTypes.yearOfPlenty]: 2,
  [devCardsTypes.monopoly]: 2,
}

export const piecesCount = {
  [piecesTypes.road]: 15,
  [piecesTypes.settlement]: 5,
  [piecesTypes.city]: 4,
}

export const COLORS = {
  TEAMS: {
    blue: colors.indigo[700],
    red: colors.red[700],
    orange: colors.orange[700],
    white: colors.common.white,
  },
  RESOURCES: {
    wood: '#1b5e20', // deep green
    brick: '#f44336', // red
    sheep: '#8bc34a', // lime
    ore: '#673ab7', // purple
    wheat: '#ffeb3b', // yellow
    robber: '#9e9e9e',
  },
}

export const tokens = {
  A: 5,
  B: 2,
  C: 6,
  D: 3,
  E: 8,
  F: 10,
  G: 9,
  H: 12,
  I: 11,
  J: 4,
  K: 8,
  L: 10,
  M: 9,
  N: 4,
  O: 5,
  P: 6,
  Q: 3,
  R: 11,
}

export const tokensCombined = Object.keys(tokens).reduce((prev, curChar) => {
  const numStr = tokens[curChar].toString()
  if (prev[numStr]) {
    prev[numStr].push(curChar)
  } else {
    prev[numStr] = [curChar]
  }
  return prev
}, {})
