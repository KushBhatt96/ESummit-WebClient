import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product } from "../../models/Product";
import { CartItem } from "../../models/CartItem";

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === action.payload.id
      );

      if (cartItem) {
        cartItem.quantity++;
        cartItem.totalPrice += action.payload.price / 100;
      } else {
        state.cartItems.push({
          id: state.cartItems.length + 1,
          product: action.payload,
          quantity: 1,
          totalPrice: action.payload.price / 100,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem) {
        cartItem.quantity = action.payload.quantity;
        cartItem.totalPrice =
          (cartItem.product.price * action.payload.quantity) / 100;
      }
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItem = (state: RootState, id: number) =>
  state.cart.cartItems.find((item) => item.product.id === id);

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
