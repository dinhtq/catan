import { Box } from '@mui/material'

const Player = ({ playerId, name }) => {
  const getPosition = (id) => {
    let result
    switch (playerId) {
      case 1:
        result = {
          left: '50%',
          top: '80%'
        }
        break;
      case 2:
        result = {
          left: '70%',
          top: '50%'
        }
        break;
      case 3:
        result = {
          left: '50%',
          top: 1
        }
        break;
      case 4:
        result = {
          left: '25%',
          top: '50%'
        }
        break;
    }
    return result;
  }

  const position = getPosition(playerId);
  console.log('position', position)
  return (
    <Box
      sx={{
        width: '200px',
        height: '200px',
        border: '1px dashed green',
        position: 'absolute',
        left: position.left,
        top: position.top,
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center',
        ':hover': {
          backgroundColor: 'pink',
        },
      }}
    >
      This players cards {playerId} {name}
    </Box>
  )
}

export default Player;