import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import axios from "axios";

import { RootState } from "../../app/store";

interface productState {
  products: Product[];
  status: string;
  error: string | undefined;
}

const initialState: productState = {
  products: [],
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5119/api/products");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct: (state) => {
      console.log(state);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
