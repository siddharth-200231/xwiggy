import { Box, Container, Grid, Typography, IconButton, useTheme, alpha } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Xwiggy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your favorite food delivery platform
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" component="div">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <a href="/menu" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</a>
                <a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a>
                <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary">
                <Facebook />
              </IconButton>
              <IconButton color="primary">
                <Twitter />
              </IconButton>
              <IconButton color="primary">
                <Instagram />
              </IconButton>
              <IconButton color="primary">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} Xwiggy. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 