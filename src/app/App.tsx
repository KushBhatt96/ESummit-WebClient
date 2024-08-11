import { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  blue,
  blueGrey,
  green,
  grey,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../common/Header";
import AppRoutes from "./Routes";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectCartQuatity } from "../features/cart/CartSlice";
import { loadCartOffline, loadCart } from "../features/cart/CartSlice";
import {
  loadLocalStorageUser,
  logout,
  selectLogoutStatus,
} from "../features/auth/AuthSlice";
import { fetchFilters } from "../features/catalog/ProductSlice";
import { LocalStorageUser } from "../models/LocalStorageUser";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutStatus = useAppSelector(selectLogoutStatus);
  const cartQuantity = useAppSelector(selectCartQuatity);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChanged = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  /*
  This useEffect is required if the user logs in, closes their browser, reopens their browser,
  and navigates back to the site.
  */
  useEffect(() => {
    const localStorageUserString = localStorage.getItem("user");
    let localStorageUser: LocalStorageUser | null = null;
    if (localStorageUserString) {
      localStorageUser = JSON.parse(localStorageUserString) as LocalStorageUser;
    }

    if (
      localStorageUser &&
      typeof localStorageUser.isLoggedIn === "boolean" &&
      localStorageUser.isLoggedIn &&
      localStorageUser.appUser
    ) {
      dispatch(loadLocalStorageUser(localStorageUser));
      dispatch(loadCart());
    } else {
      dispatch(logout()).then(() => dispatch(loadCartOffline()));
    }
    dispatch(fetchFilters());
  }, []);

  const paletteMode = isDarkMode ? "dark" : "light";
  const defaultBackgroundColorMode = isDarkMode ? blueGrey["900"] : grey["200"];

  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
    },
    palette: {
      mode: paletteMode,
      background: {
        default: defaultBackgroundColorMode,
      },
      primary: {
        light: grey["300"],
        main: grey["900"],
      },
      secondary: {
        main: teal["400"],
      },
      error: {
        main: red["A400"],
      },
      warning: {
        main: yellow["800"],
      },
      info: {
        main: blue["A200"],
      },
      success: {
        main: green["400"],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={logoutStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header
        isDarkMode={isDarkMode}
        onThemeChanged={handleThemeChanged}
        cartQuantity={cartQuantity}
        onHandleLogout={handleLogout}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
