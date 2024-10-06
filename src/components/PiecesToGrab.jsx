import { Box, colors } from '@mui/material'

import { piecesTypes, COLORS } from '../utils/constants'

function PiecesToGrab() {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {Object.keys(piecesTypes).map((piece) => {
        return (
          <Box
            key={piece}
            title={piece}
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: colors.red[500],
            }}
          />
        )
      })}
    </Box>
  )
}

export default PiecesToGrab
