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
  gamePhase,
  resource,
  rowId,
  colId,
  isLastHex,
  isLastRow,
  onBuildingPlacement,
  playersPiecesAndPositions,
  onRoadPlacementClicked,
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
    //console.log('onBuildingPlacementClicked')
    onBuildingPlacement({ rowId, colId, placement })
  }

  //console.log('buildingsPlacedMap', buildingsPlacedMap)

  const isTopLeftBuildingPlacement =
    rowId === 'row1' ||
    (rowId === 'row2' && colId === 'col1') ||
    (rowId === 'row3' && colId === 'col1')

  const isTopRightBuildingPlacement =
    (rowId === 'row1' && colId === 'col3') ||
    (rowId === 'row2' && colId === 'col4') ||
    (rowId === 'row3' && colId === 'col5')

  const isBotRightBuildingPlacement =
    (rowId === 'row3' && colId === 'col5') ||
    (rowId === 'row4' && colId === 'col4') ||
    (rowId === 'row5' && colId === 'col3')

  const isBotLeftBuildingPlacement =
    (rowId === 'row3' && colId === 'col1') ||
    (rowId === 'row4' && colId === 'col1') ||
    (rowId === 'row5' && colId === 'col1')

  return (
    <Box className="grid-hex">
      <Box className="hex" sx={{ backgroundColor: color }} />
      <RoadPlacement
        placement="topLeft"
        onRoadPlacementClicked={onRoadPlacementClicked}
        rowKey={rowId}
        colKey={colId}
        piecePlaced={
          buildingsPlacedMap[
            getBuildingsPlacedMapKey({ rowId, colId, placement: 'topLeft' })
          ]
        }
      />
      <RoadPlacement
        placement="topRight"
        onRoadPlacementClicked={onRoadPlacementClicked}
        rowKey={rowId}
        colKey={colId}
        piecePlaced={
          buildingsPlacedMap[
            getBuildingsPlacedMapKey({ rowId, colId, placement: 'topRight' })
          ]
        }
      />
      <RoadPlacement
        placement="left"
        onRoadPlacementClicked={onRoadPlacementClicked}
        rowKey={rowId}
        colKey={colId}
        piecePlaced={
          buildingsPlacedMap[
            getBuildingsPlacedMapKey({ rowId, colId, placement: 'left' })
          ]
        }
      />
      {/* last hex right road */}
      {isLastHex && (
        <RoadPlacement
          placement="right"
          rowKey={rowId}
          colKey={colId}
          onRoadPlacementClicked={onRoadPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'right' })
            ]
          }
        />
      )}
      {/* last row roads, bot left, bot right */}
      {isLastRow && (
        <>
          <RoadPlacement
            placement="botLeft"
            rowKey={rowId}
            colKey={colId}
            onRoadPlacementClicked={onRoadPlacementClicked}
            piecePlaced={
              buildingsPlacedMap[
                getBuildingsPlacedMapKey({ rowId, colId, placement: 'botLeft' })
              ]
            }
          />
          <RoadPlacement
            placement="botRight"
            rowKey={rowId}
            colKey={colId}
            onRoadPlacementClicked={onRoadPlacementClicked}
            piecePlaced={
              buildingsPlacedMap[
                getBuildingsPlacedMapKey({
                  rowId,
                  colId,
                  placement: 'botRight',
                })
              ]
            }
          />
        </>
      )}
      {isSecondToLastRowLastHex && (
        <RoadPlacement
          placement="botRight"
          rowKey={rowId}
          colKey={colId}
          onRoadPlacementClicked={onRoadPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'botRight' })
            ]
          }
        />
      )}
      {isMiddleRowLastHex && (
        <RoadPlacement
          placement="botRight"
          rowKey={rowId}
          colKey={colId}
          onRoadPlacementClicked={onRoadPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'botRight' })
            ]
          }
        />
      )}
      <BuildingPlacement
        gamePhase={gamePhase}
        placement="top"
        onBuildingPlacementClicked={onBuildingPlacementClicked}
        piecePlaced={
          buildingsPlacedMap[
            getBuildingsPlacedMapKey({ rowId, colId, placement: 'top' })
          ]
        }
      />
      {isTopLeftBuildingPlacement && (
        <BuildingPlacement
          gamePhase={gamePhase}
          placement="topLeft"
          onBuildingPlacementClicked={onBuildingPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'topLeft' })
            ]
          }
        />
      )}

      {isTopRightBuildingPlacement && (
        <BuildingPlacement
          gamePhase={gamePhase}
          placement="topRight"
          onBuildingPlacementClicked={onBuildingPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'topRight' })
            ]
          }
        />
      )}

      {isBotRightBuildingPlacement && (
        <BuildingPlacement
          gamePhase={gamePhase}
          placement="botRight"
          onBuildingPlacementClicked={onBuildingPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'botRight' })
            ]
          }
        />
      )}

      {isBotLeftBuildingPlacement && (
        <BuildingPlacement
          gamePhase={gamePhase}
          placement="botLeft"
          onBuildingPlacementClicked={onBuildingPlacementClicked}
          piecePlaced={
            buildingsPlacedMap[
              getBuildingsPlacedMapKey({ rowId, colId, placement: 'botLeft' })
            ]
          }
        />
      )}

      <BuildingPlacement
        gamePhase={gamePhase}
        placement="bottom"
        onBuildingPlacementClicked={onBuildingPlacementClicked}
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
