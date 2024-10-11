import { Box } from '@mui/material'

import RoadPlacement from '../RoadPlacement/RoadPlacement'
import BuildingPlacement from '../BuildingPlacement/BuildingPlacement'
import './GridHex.scss'
import { useCallback, useMemo } from 'react'
import { flatten } from 'lodash-es'

const getBuildingsPlacedMapKey = ({ rowId, colId, placement }) => {
  return `${rowId}-${colId}-${placement}`
}

function GridHex({
  resource,
  rowId,
  colId,
  isLastHex,
  isLastRow,
  onBuildingPlacement,
  playersPiecesAndPositions,
}) {
  const { resourceType, color, number } = resource
  const isSecondToLastRowLastHex = isLastHex && rowId === 4
  const isMiddleRowLastHex = isLastHex && rowId === 3
  const buildingsPlacedMap = useMemo(() => {
    const map = {}
    const flatPlayersPiecesAndPos = flatten(
      Object.values(playersPiecesAndPositions),
    )
    flatPlayersPiecesAndPos.forEach((piece) => {
      // console.log('piece', piece)
      const key = `${piece.rowKey}-${piece.colKey}-${piece.placement}`
      map[key] = piece
    })
    return map
  }, [playersPiecesAndPositions])
  // console.log('buildingsPlaced', buildingsPlaced)

  const onBuildingPlacementClicked = ({ placement }) => {
    console.log('onBuildingPlacementClicked')
    onBuildingPlacement({ rowId, colId, placement })
  }

  console.log('buildingsPlacedMap', buildingsPlacedMap)

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

      <BuildingPlacement
        placement="bottom"
        onBuildingPlacementClicked={onBuildingPlacementClicked}
        isTaken={
          !!buildingsPlacedMap[
            getBuildingsPlacedMapKey({ rowId, colId, placement: 'bottom' })
          ]
        }
        piecePlaced={
          buildingsPlacedMap[
            getBuildingsPlacedMapKey({ rowId, colId, placement: 'bottom' })
          ]
        }
      />
    </Box>
  )
}

export default GridHex
