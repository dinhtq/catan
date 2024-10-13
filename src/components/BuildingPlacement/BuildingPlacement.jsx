import { Box } from '@mui/material'
import { OtherHouses as SettlementIcon } from '@mui/icons-material'
import { GAME_PHASE, piecesTypes } from '../../utils/constants'

const defaultStyle = {
  position: 'absolute',
  width: '15px',
  height: '15px',
  backgroundColor: 'pink',
  zIndex: 10,
  //   border: '1px solid grey',
  //   borderRadius: '3px',
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
      top: '18px',
      left: '-40px',
      //border: '1px solid cyan',
    }),
  },
  topRight: {
    style: getStyle({
      top: '18px',
      right: '25px',
      //border: '1px solid pink',
    }),
  },
  top: {
    style: getStyle({
      top: '-26px',
      left: '30px',
      //border: '1px solid red',
      border: '1px solid grey',
      borderRadius: '3px',
    }),
  },

  botLeft: {
    style: getStyle({
      bottom: '-13px',
      left: '-43px',
      //border: '1px solid purple',
    }),
  },
  botRight: {
    style: getStyle({
      bottom: '-13px',
      right: '22px',
      //border: '1px solid limegreen',
    }),
  },
  bottom: {
    style: getStyle({
      bottom: '-52px',
      left: '31px',
      //border: '1px solid yellow',
    }),
  },
}

function getBuildingStyle({ placement, isTaken }) {
  return {
    ...buildingPlacementStyleMap[placement].style,
    backgroundColor: isTaken ? 'transparent' : 'initial',
  }
}

function BuildingPlacement({
  gamePhase,
  placement,
  onBuildingPlacementClicked,
  piecePlaced,
}) {
  const isTaken = !!piecePlaced
  const isSettlementPlaced =
    isTaken && piecePlaced && piecePlaced.pieceType === piecesTypes.settlement

  return (
    <Box
      sx={getBuildingStyle({ placement, isTaken })}
      onClick={() => {
        if (gamePhase === GAME_PHASE.INIT_PLAYER_TURN_BUILD) {
          onBuildingPlacementClicked({ placement })
        }
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
