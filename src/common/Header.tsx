import { ShoppingCart, LightMode, DarkMode } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";

const midLinks = [
  { id: 1, title: "CATALOG", path: "/catalog" },
  { id: 2, title: "ABOUT", path: "/about" },
  { id: 3, title: "CONTACT", path: "/contact" },
];

const rightLinks = [
  { id: 1, title: "SIGN IN", path: "/login" },
  { id: 2, title: "REGISTER", path: "/register" },
];

interface Props {
  isDarkMode: boolean;
  handleThemeChanged: () => void;
}

function Header({ isDarkMode, handleThemeChanged }: Props) {
  const activeLinkStyling = {
    color: "inherit",
    textDecoration: "none",
    typography: "body1",
    "&:hover": { color: "secondary.main" },
    "&.active": { color: "secondary.main" },
  };

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          width={150}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component={NavLink} to="/" sx={activeLinkStyling}>
            E-SUMMIT
          </Typography>
          <IconButton onClick={handleThemeChanged}>
            {isDarkMode ? <DarkMode /> : <LightMode color="warning" />}
          </IconButton>
        </Box>
        <Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ id, title, path }) => (
              <ListItem
                key={id}
                component={NavLink}
                to={path}
                sx={activeLinkStyling}
              >
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex", justifyContent: "flex-end" }}>
            {rightLinks.map(({ id, title, path }) => (
              <ListItem
                key={id}
                component={NavLink}
                to={path}
                sx={activeLinkStyling}
              >
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
