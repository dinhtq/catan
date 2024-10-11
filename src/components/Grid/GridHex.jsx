import { Box } from '@mui/material'

import RoadPlacement from '../RoadPlacement/RoadPlacement'
import './GridHex.scss'

function GridHex({ resource, rowId, colId, isLastHex, isLastRow }) {
  const isSecondToLastRowLastHex = isLastHex && rowId === 4
  const isMiddleRowLastHex = isLastHex && rowId === 3
  const { resourceType, color, number } = resource
  return (
    <Box className="grid-hex">
      <Box className="hex" sx={{ backgroundColor: color }} />
      <RoadPlacement placement="topLeft" />
      <RoadPlacement placement="topRight" />
      <RoadPlacement placement="left" />
      {/* last hex right road */}
      {isLastHex && <RoadPlacement placement="right" />}
      {/* last row roads, bot left, bot right */}
      {isLastRow && (
        <>
          <RoadPlacement placement="botLeft" />
          <RoadPlacement placement="botRight" />
        </>
      )}
      {isSecondToLastRowLastHex && <RoadPlacement placement="botRight" />}
      {isMiddleRowLastHex && <RoadPlacement placement="botRight" />}
    </Box>
  )
}

export default GridHex
