import { useDrag, DragPreviewImage } from 'react-dnd'
import { Box, colors } from '@mui/material'
import { AddRoad as RoadIcon } from '@mui/icons-material'

import { piecesTypes, COLORS } from '../utils/constants'

function PieceToGrab({ pieceType }) {
  const teamColor = 'red'
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: pieceType,
      item: { pieceType, teamColor },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )

  return (
    <>
      {/* <DragPreviewImage connect={preview} src={'wood.jpg'} /> */}
      <Box
        ref={drag}
        title={pieceType}
        sx={{
          width: '20px',
          height: '20px',
          // backgroundColor: colors.red[500],
        }}
      >
        <RoadIcon />
      </Box>
    </>
  )
}

function PiecesToGrab() {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {Object.keys(piecesTypes).map((piece) => {
        return <PieceToGrab key={piece} pieceType={piece} />
      })}
    </Box>
  )
}

export default PiecesToGrab
