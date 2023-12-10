import { BrowserRouter, useNavigate } from "react-router-dom";
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
import { logout, selectIsLoggedIn } from "../features/auth/AuthSlice";
import { fetchFilters } from "../features/catalog/ProductSlice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const cartQuantity = useAppSelector(selectCartQuatity);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChanged = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    // TODO: Proper logout logic
    dispatch(logout());
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadCart());
    } else {
      dispatch(loadCartOffline());
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
