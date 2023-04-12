import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
  { id: 1, title: "catalog", path: "/catalog" },
  { id: 2, title: "about", path: "/about" },
  { id: 3, title: "contact", path: "/contact" },
];

const rightLinks = [
  { id: 1, title: "login", path: "/login" },
  { id: 2, title: "register", path: "/register" },
];

interface Props {
  darkMode: boolean;
  handleThemeChanged: () => void;
}

function Header({ darkMode, handleThemeChanged }: Props) {
  const activeLinkStyling = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": { color: "secondary.main" },
    "&.active": { color: "secondary.main" },
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={activeLinkStyling}
          >
            E-SUMMIT SHOPPING
          </Typography>
          <Switch checked={darkMode} onClick={handleThemeChanged} />
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
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
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
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
