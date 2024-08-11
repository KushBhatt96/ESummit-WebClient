import { ShoppingCart, LightMode, DarkMode } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsLoggedIn } from "../features/auth/AuthSlice";
import { grey, teal } from "@mui/material/colors";
import {
  useState,
  KeyboardEvent,
  MouseEvent,
  BaseSyntheticEvent,
  ChangeEvent,
} from "react";
import {
  filterProducts,
  saveSearchText,
  searchProducts,
  selectSearchText,
  setSelectedSex,
} from "../features/catalog/ProductSlice";

const midLinks = [
  { id: 1, title: " Browse Catalog", path: "/catalog" },
  // { id: 2, title: "About", path: "/about" },
  // { id: 3, title: "Contact", path: "/contact" },
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const catalogMenuOptions = useAppSelector((state) => state.product.sex);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeLinkStyling = {
    color: "inherit",
    textDecoration: "none",
    typography: "body1",
    "&:hover": { color: "secondary.main", cursor: "pointer" },
    "&.active": { color: "secondary.main" },
  };

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const searchText = useAppSelector(selectSearchText);
  const [hoveringCatalog, setHoveringCatalog] = useState(false);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (location.pathname === "/catalog") {
        dispatch(searchProducts());
      } else {
        navigate("/catalog");
        dispatch(searchProducts());
      }
    }
  };

  const handleCatalogLinkMouseEnter = () => {
    setHoveringCatalog(true);
  };

  const handleCatalogLinkMouseLeave = () => {
    setHoveringCatalog(false);
  };

  const handleSetSex = (e: BaseSyntheticEvent) => {
    dispatch(setSelectedSex(e.target.text));
    if (location.pathname === "/catalog") {
      dispatch(filterProducts());
    }
  };

  const handleSetSearchText = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(saveSearchText(e.target.value));
  };

  return (
    <AppBar
      position="sticky"
      onMouseLeave={handleCatalogLinkMouseLeave}
      sx={{ background: `${theme.palette.primary.main}` }}
      enableColorOnDark
    >
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
          <Box component={NavLink} to="/" display="flex">
            <Box
              component="img"
              src="/images/esummit_transparent.png"
              height="3.5rem"
              width="4rem"
              sx={{
                "&:hover": { border: "2px teal solid" },
              }}
            />
          </Box>
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
                onMouseEnter={handleCatalogLinkMouseEnter}
              >
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            id="outlined-basic"
            label="Search"
            value={searchText}
            onChange={handleSetSearchText}
            onKeyDown={handleSearchKeyDown}
            variant="outlined"
            size="small"
            color="secondary"
            sx={{
              mr: 4,
              input: { color: "white" },
              label: {
                color: "white",
              },
              "&:hover label": {
                color: teal[400],
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: teal[400],
                  borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                  borderColor: teal[400],
                },
              },
            }}
          />
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            edge="start"
            color="inherit"
            sx={{
              mr: 2,
            }}
          >
            <Badge
              badgeContent={cartQuantity}
              color="secondary"
              sx={{
                "&:hover": {
                  color: teal[400],
                },
              }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex", justifyContent: "flex-end" }}>
            {isLoggedIn ? (
              <>
                <ListItem sx={activeLinkStyling} onClick={handleClick}>
                  Account
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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem component={Link} to={"/profile"} onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem component={Link} to={"/orderHistory"} onClick={handleClose}>
            Order History
          </MenuItem>
        </Menu>
      </Toolbar>
      {hoveringCatalog && (
        <Toolbar
          sx={{
            display: "flex",
            position: "absolute",
            top: "99%",
            width: "100%",
            background: `linear-gradient(${theme.palette.primary.main}, #121212)`,
          }}
        >
          <Box marginX="20%">
            <List>
              {catalogMenuOptions.map((option) => (
                <ListItem
                  key={option}
                  component={Link}
                  to={"/catalog"}
                  sx={activeLinkStyling}
                  onClick={handleSetSex}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}

export default Header;
