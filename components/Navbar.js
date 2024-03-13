import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, MenuItem  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginButton from '@/components/LoginButton';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" className="header item" color="inherit" underline="none">
            Presentation Trainner
          </Link>
        </Typography>
        <MenuItem color="inherit">
          <Link href="/topics" className="item" color="inherit" underline="none">
            Search Topics
          </Link>
        </MenuItem>
        <MenuItem color="inherit">
          <Link href="/session" className="item" color="inherit" underline="none">
            Start a Session
          </Link>
        </MenuItem>
        {/* <MenuItem color="inherit" onClick={'/bookma'} > */}
          <Link href="/bookmark" className="item" color="inherit" underline="none">
            Bookmarks
          </Link>
        {/* </MenuItem> */}
        <MenuItem color="inherit">
          <Link href="/profile" className="item" color="inherit" underline="none">
            Profile
          </Link>
        </MenuItem>
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
