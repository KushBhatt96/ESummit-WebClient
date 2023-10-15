import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";
import productReducer from "../features/catalog/ProductSlice";
import authReducer from "../features/auth/AuthSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
