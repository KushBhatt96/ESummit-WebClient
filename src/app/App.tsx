import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../common/Header";
import AppRoutes from "./Routes";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getCart, selectCartQuatity } from "../features/cart/CartSlice";

function App() {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuatity);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const handleThemeChanged = () => {
    setIsDarkMode(!isDarkMode);
  };

  const paletteMode = isDarkMode ? "dark" : "light";
  const backgroundColorMode = isDarkMode ? "#263238" : "#E9E9E9";

  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
    },
    palette: {
      mode: paletteMode,
      background: {
        default: backgroundColorMode,
      },
      primary: {
        light: grey["300"],
        main: grey["900"],
      },
      secondary: {
        main: green["300"],
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
