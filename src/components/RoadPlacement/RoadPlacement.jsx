import { Box } from '@mui/material'

const defaultStyle = {
  position: 'absolute',
  width: '10px',
  height: '50px',
  backgroundColor: 'transparent',
}

const getStyle = (style) => {
  return {
    ...defaultStyle,
    ...style,
  }
}

const roadPlacementStyleMap = {
  topLeft: {
    style: getStyle({
      top: '-24px',
      left: '-2px',
      transform: 'rotate(60deg)',
      border: '1px dashed white',
    }),
  },
  topRight: {
    style: getStyle({
      top: '-23px',
      right: '62px',
      border: '1px dashed purple',
      transform: 'rotate(-60deg)',
    }),
  },
  left: {
    style: getStyle({
      top: '39px',
      left: '-38px',
      border: '1px dashed blue',
      transform: 'rotate(0deg)',
    }),
  },

  botLeft: {
    style: getStyle({
      bottom: '-48px',
      left: '-7px',
      border: '1px dashed cyan',
      transform: 'rotate(-60deg)',
    }),
  },
  botRight: {
    style: getStyle({
      bottom: '-50px',
      right: '61px',
      border: '1px dashed limegreen',
      transform: 'rotate(60deg)',
    }),
  },
  right: {
    style: getStyle({
      top: '39px',
      right: '25px',
      border: '1px dashed burlywood',
      transform: 'rotate(0deg)',
    }),
  },
}

function RoadPlacement({ placement }) {
  return <Box sx={{ ...roadPlacementStyleMap[placement].style }} />
}

export default RoadPlacement
