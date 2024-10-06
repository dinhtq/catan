export const TOTAL_PIECES = 19

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

export const piecesCount = {
  [piecesTypes.road]: 15,
  [piecesTypes.settlement]: 5,
  [piecesTypes.city]: 4,
}

export const COLORS = {
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
