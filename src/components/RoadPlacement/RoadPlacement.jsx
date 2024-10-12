import { Box } from '@mui/material'
import { piecesTypes } from '../../utils/constants'
import { useMemo } from 'react'

const defaultStyle = {
  position: 'absolute',
  width: '10px',
  height: '50px',
  backgroundColor: 'transparent',
  '&:hover': {
    cursor: 'pointer',
    border: '1px solid yellow',
  },
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
    }),
  },
  topRight: {
    style: getStyle({
      top: '-23px',
      right: '62px',
      transform: 'rotate(-60deg)',
    }),
  },
  left: {
    style: getStyle({
      top: '39px',
      left: '-38px',
      transform: 'rotate(0deg)',
    }),
  },

  botLeft: {
    style: getStyle({
      bottom: '-48px',
      left: '-7px',
      transform: 'rotate(-60deg)',
    }),
  },
  botRight: {
    style: getStyle({
      bottom: '-50px',
      right: '61px',
      transform: 'rotate(60deg)',
    }),
  },
  right: {
    style: getStyle({
      top: '39px',
      right: '25px',
      transform: 'rotate(0deg)',
    }),
  },
}

function RoadPlacement({
  placement,
  onRoadPlacementClicked,
  piecePlaced,
  rowKey,
  colKey,
}) {
  const isTaken = !!piecePlaced
  const isRoadPlaced =
    isTaken &&
    piecePlaced &&
    piecePlaced.pieceType === piecesTypes.road &&
    piecePlaced.rowKey === rowKey &&
    piecePlaced.colKey === colKey &&
    piecePlaced.placement === placement

  const onRoadPlacement = () => {
    onRoadPlacementClicked({ placement })
  }

  const backgroundColor = useMemo(() => {
    return {
      backgroundColor: isRoadPlaced
        ? piecePlaced.playerTeamColor
        : 'transparent',
    }
  }, [piecePlaced])

  const style = {
    ...roadPlacementStyleMap[placement].style,
    ...backgroundColor,
  }

  return <Box sx={style} onClick={onRoadPlacement} />
}

export default RoadPlacement
