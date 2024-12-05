import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const userData = sessionStorage.getItem('userData');
      setUser(userData ? JSON.parse(userData) : null);
    };
    
    checkAuth();
    return () => window.removeEventListener('storage', checkAuth);
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login', { replace: true });
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 }, height: 64 }}>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Xwiggy
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                  sx: {
                    width: 240,
                    backgroundColor: theme.palette.background.default,
                  }
                }}
              >
                <List sx={{ pt: 2 }}>
                  {navItems.map((item) => (
                    <ListItem 
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                  {user ? (
                    <>
                      <ListItem>
                        <ListItemText primary={`Welcome, ${user.firstname}`} />
                      </ListItem>
                      <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem button onClick={() => navigate('/login')}>
                        <ListItemText primary="Login" />
                      </ListItem>
                      <ListItem button onClick={() => navigate('/register')}>
                        <ListItemText primary="Register" />
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {user ? (
                <>
                  <Typography sx={{ ml: 2 }}>
                    Welcome, {user.firstname}
                  </Typography>
                  <Button 
                    variant="outlined"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
