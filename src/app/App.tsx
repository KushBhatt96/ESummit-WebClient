import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { useState } from "react";
import Home from "../features/home/Home";
import NotFound from "../features/notFound/NotFound";
import Catalog from "../features/catalog/Catalog";
import Header from "../common/Header";

export function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChanged = () => {
    setDarkMode(!darkMode);
  };

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
      primary: {
        light: "#c4cde4",
        main: "#5a74b1",
        dark: "#192f6c",
      },
      secondary: {
        light: "#ffd778",
        main: "#eab641",
        dark: "#966a2f",
      },
    },
    typography: {
      fontFamily: ["Arial"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChanged={handleThemeChanged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="*" element={<NotFound />} />
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
