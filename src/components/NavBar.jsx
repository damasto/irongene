import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Route, Link as RouterLink } from "react-router-dom"
import { AuthContext } from '../context/auth.context';
import { useContext, useState, useEffect } from 'react';
import api from '../api/axios';


export default function NavBar() {

  const {isAdmin} = useContext(AuthContext);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#f9f9f9',
        color: '#1a1a1a',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        {/* Left: Logo or Brand */}
        <RouterLink to="/" className='no-decoration'>
          <Typography variant="h6" sx={{ fontWeight: 300, letterSpacing: 2 }}>
            IronGene
          </Typography>
        </RouterLink>

        {/* Center: Navigation */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button color="inherit" sx={{ fontWeight: 300 }}>
            Products
          </Button>
          <RouterLink to="/clinics" className='no-decoration'>
            <Button color="inherit" sx={{ fontWeight: 300 }}>
              Clinics
            </Button>
          </RouterLink>
          <Button color="inherit" sx={{ fontWeight: 300 }}>
            Team
          </Button>
          {isAdmin && (
            <RouterLink className='no-decoration' to="/system-administration">
            <Button color="inherit" sx={{ fontWeight: 300 }}>System Administration</Button>
            </RouterLink>
          )}
        </Box>

        {/* Right: Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <RouterLink to="/profile">
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </RouterLink>

          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
