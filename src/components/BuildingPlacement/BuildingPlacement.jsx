import { Box } from '@mui/material'
import { OtherHouses as SettlementIcon } from '@mui/icons-material'
import { piecesTypes } from '../../utils/constants'

const defaultStyle = {
  position: 'absolute',
  width: '15px',
  height: '15px',
  backgroundColor: 'pink',
  zIndex: 10,
  border: '1px solid yellow',
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
    backgroundColor: isTaken ? 'transparent' : 'pink',
  }
}

function BuildingPlacement({
  isTaken,
  placement,
  onBuildingPlacementClicked,
  piecePlaced,
}) {
  console.log('piecePlaced', piecePlaced)
  const isSettlementPlaced =
    isTaken && piecePlaced && piecePlaced.pieceType === piecesTypes.settlement
  console.log('isSettlementPlaced', isSettlementPlaced)
  return (
    <Box
      sx={getBuildingStyle({ placement, isTaken })}
      onClick={() => {
        onBuildingPlacementClicked({ placement })
      }}
    >
      {isSettlementPlaced && (
        <SettlementIcon
          fontSize="large"
          sx={{
            position: 'absolute',
            left: '-10px',
            top: '-10px',
            backgroundColor: piecePlaced.playerTeamColor,
            borderRadius: '50%',
            padding: '4px',
          }}
        />
      )}
    </Box>
  )
}

export default BuildingPlacement
