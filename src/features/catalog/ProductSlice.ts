import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import axios from "axios";

import { RootState } from "../../app/store";

interface productState {
  products: Product[];
  sizeOptions: string[];
  colors: string[];
  brands: string[];
  types: string[];
  sex: string[];
  selectedColors: string[];
  selectedBrands: string[];
  selectedTypes: string[];
  selectedSex: string;
  orderBy: string;
  searchText: string;
  pageCount: number;
  pageNumber: number;
  status: string;
  error: string | undefined;
}

const initialState: productState = {
  products: [],
  sizeOptions: [],
  colors: [],
  brands: [],
  types: [],
  sex: [],
  selectedBrands: [],
  selectedColors: [],
  selectedTypes: [],
  selectedSex: "",
  orderBy: "",
  searchText: "",
  pageCount: 1,
  pageNumber: 1,
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (page: number | undefined, { getState, dispatch }) => {
    const currentState = getState() as RootState;
    const orderBy = currentState.product.orderBy;
    const searchText = currentState.product.searchText;
    const colors = currentState.product.selectedColors;
    const types = currentState.product.selectedTypes;
    const brands = currentState.product.selectedBrands;
    const selectedSex = currentState.product.selectedSex;
    let pageNumber = currentState.product.pageNumber;
    if (page) {
      dispatch(setPageNumber(page));
      pageNumber = page;
    }
    const response = await axios.get("http://localhost:5119/api/products", {
      params: {
        orderBy: orderBy,
        colors: colors.join(","),
        types: types.join(","),
        brands: brands.join(","),
        searchKey: searchText,
        pageNumber: pageNumber.toString(),
        sex: selectedSex,
      },
    });
    return response.data;
  }
);

export const fetchFilters = createAsyncThunk(
  "product/fetchFilters",
  async () => {
    const response = await axios.get(
      "http://localhost:5119/api/products/getfilters"
    );

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
    addColorFilter: (state, action: PayloadAction<string>) => {
      const currentColorFilters = state.selectedColors;
      state.selectedColors = [...currentColorFilters, action.payload];
    },
    removeColorFilter: (state, action: PayloadAction<string>) => {
      state.selectedColors = state.selectedColors.filter(
        (color) => color != action.payload
      );
    },
    addTypeFilter: (state, action: PayloadAction<string>) => {
      const currentTypeFilters = state.selectedTypes;
      state.selectedTypes = [...currentTypeFilters, action.payload];
    },
    removeTypeFilter: (state, action: PayloadAction<string>) => {
      state.selectedTypes = state.selectedTypes.filter(
        (type) => type != action.payload
      );
    },
    addBrandFilter: (state, action: PayloadAction<string>) => {
      const currentBrandFilters = state.selectedBrands;
      state.selectedBrands = [...currentBrandFilters, action.payload];
    },
    removeBrandFilter: (state, action: PayloadAction<string>) => {
      state.selectedBrands = state.selectedBrands.filter(
        (brand) => brand != action.payload
      );
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    saveSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setSelectedSex: (state, action: PayloadAction<string>) => {
      if (action.payload.toLowerCase() === "all") {
        state.selectedSex = "Women,Men";
      } else {
        state.selectedSex = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.productList;
        state.pageCount = action.payload.numberOfPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sizeOptions = action.payload[0];
        state.brands = action.payload[1];
        state.colors = action.payload[2];
        state.types = action.payload[3];
        state.sex = action.payload[4];
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state: RootState) => state.product.products;

export const {
  addProduct,
  addColorFilter,
  removeColorFilter,
  addTypeFilter,
  removeTypeFilter,
  addBrandFilter,
  removeBrandFilter,
  setOrderBy,
  saveSearchText,
  setPageNumber,
  setSelectedSex,
} = productSlice.actions;

export default productSlice.reducer;
