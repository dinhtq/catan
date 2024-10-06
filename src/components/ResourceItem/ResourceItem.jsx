import { Box } from '@mui/material'

function ResourceItem({ resource, rowId, colId }) {
  const { resourceType, color } = resource
  console.log('resourceType', resourceType)

  const onCenterClicked = () => {
    console.log(
      'onCenterClicked',
      `row ${rowId}, col ${colId}, resource ${resourceType}`,
    )
  }
  const onCornerClicked = () => {
    console.log(
      'onCornerClicked',
      `row ${rowId}, col ${colId}, resource ${resourceType}`,
    )
  }

  return (
    <Box
      className="resource-item"
      sx={{ backgroundColor: color, position: 'relative' }}
    >
      <Box
        onClick={onCenterClicked}
        sx={{
          width: '70%',
          height: '40%',
          border: '1px dashed green',
          position: 'absolute',
          left: '15%',
          top: '30%',
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
          ':hover': {
            backgroundColor: 'pink',
          },
        }}
      >
        {resourceType}
      </Box>
      <Box
        onClick={onCornerClicked}
        sx={{
          position: 'absolute',
          width: '10px',
          height: '30px',
          backgroundColor: 'white',
          clipPath: 'none',
          left: '20px',
          top: '5px',
          transform: 'rotate(60deg)',
          ':hover': {
            backgroundColor: 'pink',
          },
        }}
      />
    </Box>
  )
}

export default ResourceItem
