import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../features/home/Home";
import NotFound from "../features/notFound/NotFound";
import Catalog from "../features/catalog/Catalog";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
