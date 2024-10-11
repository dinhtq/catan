import { Box } from '@mui/material'

const defaultStyle = {
  position: 'absolute',
  width: '15px',
  height: '15px',
  backgroundColor: 'pink',
  zIndex: 10,
}

const getStyle = (style) => {
  return {
    ...defaultStyle,
    ...style,
  }
}

const buildingPlacementStyleMap = {
  topLeft: {
    style: getStyle({
      top: '-24px',
      left: '-2px',
    }),
  },
  topRight: {
    style: getStyle({
      top: '-23px',
      right: '62px',
    }),
  },
  top: {
    style: getStyle({
      top: '39px',
      left: '-38px',
    }),
  },

  botLeft: {
    style: getStyle({
      bottom: '-48px',
      left: '-7px',
    }),
  },
  botRight: {
    style: getStyle({
      bottom: '-50px',
      right: '61px',
    }),
  },
  bottom: {
    style: getStyle({
      bottom: '-52px',
      left: '31px',
    }),
  },
}

function getBuildingStyle({ placement, isTaken }) {
  return {
    ...buildingPlacementStyleMap[placement].style,
    backgroundColor: isTaken ? 'red' : 'pink',
  }
}

function BuildingPlacement({ isTaken, placement, onBuildingPlacementClicked }) {
  return (
    <Box
      sx={getBuildingStyle({ placement, isTaken })}
      onClick={() => {
        onBuildingPlacementClicked({ placement })
      }}
    />
  )
}

export default BuildingPlacement
