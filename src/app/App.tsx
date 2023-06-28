import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../features/home/Home";
import NotFound from "../features/notFound/NotFound";
import Catalog from "../features/catalog/Catalog";
import Header from "../common/Header";
import ProductDetail from "../features/catalog/ProductDetail";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ServerError from "../common/errors/ServerError";
import Cart from "../features/cart/Cart";

export function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChanged = () => {
    setDarkMode(!darkMode);
  };

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    typography: {
      fontFamily: "roboto",
    },
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
      primary: {
        light: "#e9e9e9",
        main: "#262626",
        dark: "#00a94d",
      },
      secondary: {
        light: "#b4deec",
        main: "#51a4ca",
        dark: "#236793",
        contrastText: "white",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChanged={handleThemeChanged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog">
          <Route index element={<Catalog />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
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
