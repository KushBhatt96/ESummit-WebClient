import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../features/home/Home";
import Catalog from "../features/catalog/Catalog";
import ProductDetail from "../features/catalog/ProductDetail";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ServerError from "../common/errors/ServerError";
import NotFound from "../common/errors/NotFound";
import Cart from "../features/cart/Cart";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Profile from "../features/account/Profile";
import OrderHistory from "../features/account/OrderHistory";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog">
        <Route index element={<Catalog />} />
        <Route path=":id" element={<ProductDetail />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orderHistory" element={<OrderHistory />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}

export default AppRoutes;
