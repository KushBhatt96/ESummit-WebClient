import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product } from "../../models/Product";

interface CartState {
  cartItems: Product[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
