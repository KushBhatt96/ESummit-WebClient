import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartItem } from "../../models/CartItem";
import axios from "axios";
import { Cart } from "../../models/Cart";

const baseUrl = "http://localhost:5119";

interface CartState {
  cartItems: CartItem[];
  status: string;
  error: string | undefined;
}

const initialState: CartState = {
  cartItems: [],
  status: "idle",
  error: "",
};

// action/thunk TYPE naming convention "feature/eventName"
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await axios.get(`${baseUrl}/api/cart`);
  return response.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: number) => {
    const response = await axios.post(`${baseUrl}/api/cartItems/${productId}`);
    return response.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId: number) => {
    await axios.delete(`${baseUrl}/api/cartItems/${cartItemId}`);
    return cartItemId;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({
    cartItemId,
    quantity,
  }: {
    cartItemId: number;
    quantity: number;
  }) => {
    const params = {
      quantity,
    };
    await axios.put(`${baseUrl}/api/cartItems/${cartItemId}`, params);
    return {
      cartItemId,
      quantity,
    };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.status = "succeeded";

        state.cartItems = action.payload.cartItems;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = "succeeded";

          const cartItem = state.cartItems.find(
            (item) => item.cartItemId === action.payload.cartItemId
          );

          if (cartItem) {
            cartItem.quantity = action.payload.quantity;
            cartItem.totalPrice = action.payload.totalPrice;
          } else {
            state.cartItems.push(action.payload);
          }
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        removeCartItem.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.cartItemId != action.payload
          );
        }
      )
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateCartItemQuantity.fulfilled,
        (
          state,
          action: PayloadAction<{ cartItemId: number; quantity: number }>
        ) => {
          state.status = "succeeded";
          const cartItem = state.cartItems.find(
            (cartItem) => cartItem.cartItemId === action.payload.cartItemId
          );

          if (cartItem) {
            cartItem.quantity = action.payload.quantity;
          }
        }
      )
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItem = (state: RootState, id: number) =>
  state.cart.cartItems.find((item) => item.product.productId === id);
export const selectCartQuatity = (state: RootState) =>
  state.cart.cartItems.length;

export default cartSlice.reducer;
