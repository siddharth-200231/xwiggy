import { Box, Container, useTheme, alpha } from '@mui/material';
import Navbar from '../Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 2, md: 4 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout; 