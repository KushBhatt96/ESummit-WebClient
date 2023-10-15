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
import { useAppSelector } from "../app/hooks";
import { selectIsLoggedIn } from "../features/auth/AuthSlice";

const midLinks = [
  { id: 1, title: "Catalog", path: "/catalog" },
  { id: 2, title: "About", path: "/about" },
  { id: 3, title: "Contact", path: "/contact" },
];

const rightLinks = [
  { id: 1, title: "Login", path: "/login" },
  { id: 2, title: "Register", path: "/register" },
];

interface Props {
  isDarkMode: boolean;
  onThemeChanged: () => void;
  cartQuantity: number;
  onHandleLogout: () => void;
}

function Header({
  isDarkMode,
  onThemeChanged,
  cartQuantity,
  onHandleLogout,
}: Props) {
  const activeLinkStyling = {
    color: "inherit",
    textDecoration: "none",
    typography: "body1",
    "&:hover": { color: "secondary.main", cursor: "pointer" },
    "&.active": { color: "secondary.main" },
  };

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
            E-Summit
          </Typography>
          <IconButton onClick={onThemeChanged}>
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
            <Badge badgeContent={cartQuantity} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex", justifyContent: "flex-end" }}>
            {isLoggedIn ? (
              <>
                <ListItem
                  component={NavLink}
                  to="/Profile"
                  sx={activeLinkStyling}
                >
                  Profile
                </ListItem>
                <ListItem sx={activeLinkStyling} onClick={onHandleLogout}>
                  Logout
                </ListItem>
              </>
            ) : (
              rightLinks.map(({ id, title, path }) => (
                <ListItem
                  key={id}
                  component={NavLink}
                  to={path}
                  sx={activeLinkStyling}
                >
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
