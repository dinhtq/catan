import { useState } from 'react'
import { Box } from '@mui/material'
import { useDrop } from 'react-dnd'

import { piecesTypes } from '../../utils/constants'

function RoadBox({ rowId, colId, resourceType }) {
  const [roadColor, setRoadColor] = useState('transparent')
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: piecesTypes.road,
      // canDrop: () => game.canMoveKnight(x, y),
      drop(itemDropped) {
        const { pieceType, teamColor } = itemDropped
        console.log('itemDropped', itemDropped)
        setRoadColor(teamColor)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  )
  //   const onRoadClicked = () => {
  //     console.log(
  //       'onCornerClicked',
  //       `row ${rowId}, col ${colId}, resource ${resourceType}`,
  //     )
  //   }
  return (
    <Box
      ref={drop}
      sx={{
        position: 'absolute',
        width: '10px',
        height: '30px',
        backgroundColor: isOver ? 'white' : roadColor,
        clipPath: 'none',
        left: '20px',
        top: '5px',
        transform: 'rotate(60deg)',
        // ':hover': {
        //   backgroundColor: 'white',
        // },
      }}
    />
  )
}

function ResourceItem({ resource, rowId, colId }) {
  const { resourceType, color, number } = resource
  // console.log('resourceType', resourceType)

  const onCenterClicked = () => {
    console.log(
      'onCenterClicked',
      `row ${rowId}, col ${colId}, resource ${resourceType}`,
    )
  }

  return (
    <Box
      className="resource-item"
      sx={{ backgroundColor: color, position: 'relative' }}
    >
      <Box
        onClick={onCenterClicked}
        sx={{
          width: '70%',
          height: '40%',
          border: '1px dashed green',
          position: 'absolute',
          left: '15%',
          top: '30%',
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#ffcc00',
          ':hover': {
            backgroundColor: 'pink',
          },
        }}
      >
        {number}
      </Box>
      <RoadBox rowId={rowId} colId={colId} resourceType={resourceType} />
    </Box>
  )
}

export default ResourceItem
