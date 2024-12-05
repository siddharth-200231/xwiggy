import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import { 
  RestaurantMenu, 
  ShoppingCart, 
  LocalShipping
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <RestaurantMenu sx={{ fontSize: 32 }} />,
      title: 'Premium Menu Selection',
      description: 'Curated dishes from top restaurants'
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 32 }} />,
      title: 'Seamless Ordering',
      description: 'Easy and secure checkout process'
    },
    {
      icon: <LocalShipping sx={{ fontSize: 32 }} />,
      title: 'Express Delivery',
      description: 'Fast and reliable delivery service'
    }
  ];

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
    }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Stack spacing={3}>
                <Typography 
                  variant="h1"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Elevate Your Dining Experience
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary"
                  sx={{ textAlign: { xs: 'center', md: 'left' } }}
                >
                  Premium food delivery for discerning tas
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained"
                    onClick={() => navigate('/menu')}
                    sx={{ 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    }}
                  >
                    Explore Menu
                  </Button>
                  <Button 
                    variant="outlined"
                    onClick={() => navigate('/register')}
                  >
                    Join Now
                  </Button>
                </Box>
              </Stack>
            </MotionBox>
          </Grid>

          {/* Right side - Features */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              {features.map((feature, index) => (
                <Grid item xs={12} key={index}>
                  <MotionCard
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    sx={{ 
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 1.5
                    }}>
                      <Box 
                        sx={{ 
                          color: 'primary.main',
                          background: alpha(theme.palette.primary.main, 0.1),
                          borderRadius: '50%',
                          p: 1,
                          display: 'flex'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 