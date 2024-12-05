import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        width: '100%'
      }}
    >
      <CircularProgress 
        size={40}
        thickness={4}
        sx={{
          color: 'primary.main'
        }}
      />
    </Box>
  );
};

export default LoadingScreen; 