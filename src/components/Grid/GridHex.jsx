import { Box } from '@mui/material'
import './GridHex.scss'

const roadsPlacements = [
  {
    title: 'top-left-road',
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
  {
    title: 'top-right-road',
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
  {
    title: 'left-road',
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
]

function BottomRightRoad() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '-50px',
        right: '61px',
        width: '10px',
        height: '50px',
        backgroundColor: 'limegreen',
        transform: 'rotate(60deg)',
      }}
    />
  )
}

function GridHex({ resource, rowId, colId, isLastHex, isLastRow }) {
  const isSecondToLastRowLastHex = isLastHex && rowId === 4
  const isMiddleRowLastHex = isLastHex && rowId === 3
  const { resourceType, color, number } = resource
  return (
    <Box className="grid-hex">
      <Box className="hex" sx={{ backgroundColor: color }} />
      {/* top left */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: '-24px',
          left: '-2px',
          width: '10px',
          height: '50px',
          backgroundColor: 'white',
          transform: 'rotate(60deg)',
        }}
      /> */}
      {/* top right */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: '0px',
          right: '2px',
          width: '10px',
          height: '20px',
          backgroundColor: 'purple',
          transform: 'rotate(60deg)',
        }}
      /> */}
      {roadsPlacements.map(({ title, style }) => (
        <Box key={title} sx={style} />
      ))}
      {/* last hex right road */}
      {isLastHex && (
        <Box
          sx={{
            position: 'absolute',
            top: '39px',
            right: '25px',
            width: '10px',
            height: '50px',
            backgroundColor: 'orange',
            transform: 'rotate(0deg)',
          }}
        />
      )}
      {/* last row roads, bot left, bot right */}
      {isLastRow && (
        <>
          <Box
            sx={{
              position: 'absolute',
              bottom: '-48px',
              left: '-7px',
              width: '10px',
              height: '50px',
              backgroundColor: 'cyan',
              transform: 'rotate(-60deg)',
            }}
          />
          <BottomRightRoad />
        </>
      )}
      {isSecondToLastRowLastHex && <BottomRightRoad />}
      {isMiddleRowLastHex && <BottomRightRoad />}
    </Box>
  )
}

export default GridHex
