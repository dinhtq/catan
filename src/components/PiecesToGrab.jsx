import { Box } from '@mui/material'

import { pieceTypes, COLORS } from '../utils/constants'

function PiecesToGrab() {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {Object.keys(pieceTypes).map((piece) => {
        return (
          <Box
            key={piece}
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: COLORS.RESOURCES[piece],
            }}
          />
        )
      })}
    </Box>
  )
}

export default PiecesToGrab
