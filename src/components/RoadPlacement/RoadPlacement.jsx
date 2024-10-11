import { Box } from '@mui/material'

const roadPlacementStyleMap = {
  topLeft: {
    style: {
      position: 'absolute',
      top: '-24px',
      left: '-2px',
      width: '10px',
      height: '50px',
      backgroundColor: 'white',
      transform: 'rotate(60deg)',
    },
  },
  topRight: {
    style: {
      position: 'absolute',
      top: '-23px',
      right: '62px',
      width: '10px',
      height: '50px',
      backgroundColor: 'purple',
      transform: 'rotate(-60deg)',
    },
  },
  left: {
    style: {
      position: 'absolute',
      top: '39px',
      left: '-38px',
      width: '10px',
      height: '50px',
      backgroundColor: 'blue',
      transform: 'rotate(0deg)',
    },
  },

  botLeft: {
    style: {
      position: 'absolute',
      bottom: '-48px',
      left: '-7px',
      width: '10px',
      height: '50px',
      backgroundColor: 'cyan',
      transform: 'rotate(-60deg)',
    },
  },
  botRight: {
    style: {
      position: 'absolute',
      bottom: '-50px',
      right: '61px',
      width: '10px',
      height: '50px',
      backgroundColor: 'transparent',
      border: '1px dashed limegreen',
      transform: 'rotate(60deg)',
    },
  },
  right: {
    style: {
      position: 'absolute',
      top: '39px',
      right: '25px',
      width: '10px',
      height: '50px',
      backgroundColor: 'burlywood',
      transform: 'rotate(0deg)',
    },
  },
}

function RoadPlacement({ placement }) {
  return <Box sx={{ ...roadPlacementStyleMap[placement].style }} />
}

export default RoadPlacement
