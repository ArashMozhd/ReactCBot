import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img src="/path/to/logo.png" alt="DocChat Logo" width="30" height="30" style={{ marginRight: 8 }} />
            DocChat
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/upload" style={{ color: 'inherit', textDecoration: 'none' }}>
            Upload
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/chat" style={{ color: 'inherit', textDecoration: 'none' }}>
            Chat
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
            About
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
