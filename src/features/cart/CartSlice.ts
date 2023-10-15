import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartItem } from "../../models/CartItem";
import axios from "axios";
import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";
import Cookies from "js-cookie";

// CONSTANTS
const baseUrl = "http://localhost:5119";

// STATE
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

// THUNKS
export const loadCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState }) => {
    const currentState: RootState = getState() as RootState;
    const localCartItems = currentState.cart.cartItems;
    const jwt = Cookies.get("jwt");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    if (localCartItems && localCartItems.length !== 0) {
      await axios.post(
        `${baseUrl}/api/cartItems/AppendLocalCartItems`,
        localCartItems,
        config
      );
    }

    const response = await axios.get(`${baseUrl}/api/cart`, config);

    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: number) => {
    const jwt = Cookies.get("jwt");
    const config = {
      method: "post",
      url: `${baseUrl}/api/cartItems/${productId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await axios(config);
    return response.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId: number) => {
    const jwt = Cookies.get("jwt");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.delete(`${baseUrl}/api/cartItems/${cartItemId}`, config);
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
    const jwt = Cookies.get("jwt");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    await axios.put(`${baseUrl}/api/cartItems/${cartItemId}`, params, config);
    return {
      cartItemId,
      quantity,
    };
  }
);

// SLICE
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCartOffline: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const cartItems = state.cartItems;
      const cartItem = cartItems.find(
        (item) => item.productId === productToAdd.productId
      );

      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.totalPrice += productToAdd.price;
      } else {
        const lastIndex = cartItems.length - 1;
        const newId =
          cartItems.length === 0 ? 1 : cartItems[lastIndex].cartItemId + 1; // calculate an offline cartItemId
        const newCartItem: CartItem = {
          cartItemId: newId,
          productId: productToAdd.productId,
          cartId: -1, // indicates an offline change to cart
          product: productToAdd,
          quantity: 1,
          totalPrice: productToAdd.price,
        };
        cartItems.push(newCartItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    removeCartItemOffline: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.productId !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCartItemQuantityOffine: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity < 1 || quantity > 5) {
        return;
      }
      const cartItem = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (cartItem) {
        cartItem.quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    loadCartOffline: (state) => {
      const offlineCart = localStorage.getItem("cartItems");
      if (offlineCart) {
        state.cartItems = JSON.parse(offlineCart) as CartItem[];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.status = "succeeded";
        state.cartItems = action.payload.cartItems;
        localStorage.removeItem("cartItems"); // now that we are authenticated and connected to the DB, clear localstorage cart
      })
      .addCase(loadCart.rejected, (state, action) => {
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

// SELECTORS
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItem = (state: RootState, id: number) =>
  state.cart.cartItems.find((item) => item.product.productId === id);
export const selectCartQuatity = (state: RootState) =>
  state.cart.cartItems.length;
export const selectCartStatus = (state: RootState) => state.cart.status;

// ACTIONS
export const {
  addToCartOffline,
  loadCartOffline,
  removeCartItemOffline,
  updateCartItemQuantityOffine,
} = cartSlice.actions;

// REDUCER
export default cartSlice.reducer;
