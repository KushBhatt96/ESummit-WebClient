import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import {
  blue,
  blueGrey,
  green,
  grey,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

import Header from "../common/Header";
import AppRoutes from "./Routes";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectCartQuatity } from "../features/cart/CartSlice";
import { loadCartOffline, loadCart } from "../features/cart/CartSlice";
import { logout } from "../features/auth/AuthSlice";

function App() {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuatity);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChanged = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    dispatch(logout());
    window.location.href = "/"; // causes a full refresh and navigates to desired route
  };

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      dispatch(loadCart());
    } else {
      dispatch(loadCartOffline());
    }
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
