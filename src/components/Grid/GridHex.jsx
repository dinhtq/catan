import { Box } from '@mui/material'
import './GridHex.scss'

function GridHex({ resource, rowId, colId }) {
  const { resourceType, color, number } = resource
  return (
    <Box className="grid-hex">
      <Box className="hex" sx={{ backgroundColor: color }} />
    </Box>
  )
}

export default GridHex
