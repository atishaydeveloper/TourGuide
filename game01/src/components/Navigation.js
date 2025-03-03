import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navigation = () => {
  const navigate = useNavigate();
  const [sitesAnchorEl, setSitesAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const sites = [
    { id: 'taj-mahal', name: 'Taj Mahal' },
    { id: 'ellora-caves', name: 'Ellora Caves' },
    { id: 'hampi', name: 'Hampi' },
    { id: 'red-fort', name: 'Red Fort' },
    { id: 'qutub-minar', name: 'Qutub Minar' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSitesClick = (event) => {
    setSitesAnchorEl(event.currentTarget);
  };

  const handleSitesClose = () => {
    setSitesAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const navItems = [
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Artifacts & Handicrafts', path: '/artifacts' },
    { name: 'Meet Tour Guide', path: '/tour-guide' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            Heritage Explorer
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileAnchorEl}
              open={Boolean(mobileAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleSitesClick}>
                Heritage Sites
              </MenuItem>
              {navItems.map((item) => (
                <MenuItem 
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                >
                  {item.name}
                </MenuItem>
              ))}
              <MenuItem 
                component={RouterLink}
                to="/profile"
                onClick={handleMobileMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={() => {
                handleMobileMenuClose();
                handleLogout();
              }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              color="inherit"
              onClick={handleSitesClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Heritage Sites
            </Button>
            <Menu
              anchorEl={sitesAnchorEl}
              open={Boolean(sitesAnchorEl)}
              onClose={handleSitesClose}
            >
              {sites.map(site => (
                <MenuItem
                  key={site.id}
                  component={RouterLink}
                  to={`/heritage-sites/${site.id}`}
                  onClick={handleSitesClose}
                >
                  {site.name}
                </MenuItem>
              ))}
            </Menu>

            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.name}
              </Button>
            ))}
            
            <Button
              color="inherit"
              component={RouterLink}
              to="/profile"
              startIcon={<AccountCircleIcon />}
            >
              Profile
            </Button>
            
            <Button 
              color="inherit" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
