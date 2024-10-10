import { Box } from '@mui/material'
import './GridHex.scss'

function GridHex({ resource, rowId, colId }) {
  // const { resourceType, color, number } = resource
  return (
    <Box className="grid-hex">
      <Box className="hex" />
    </Box>
  )
}

export default GridHex
