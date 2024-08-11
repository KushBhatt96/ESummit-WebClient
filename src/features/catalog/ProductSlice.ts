import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import axios from "axios";

import { RootState } from "../../app/store";
import { baseUrl } from "../../common/constants/constants";

const productsPath = "/api/products";
const fullProductsUrl = `${baseUrl}${productsPath}`;
const getFiltersPath = "/getfilters";
const getFiltersUrl = `${fullProductsUrl}${getFiltersPath}`;
const defaultPageNumber = 1;
const defaultSearchText = "";
const separator = ",";

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
  pageNumber: defaultPageNumber,
  status: "idle",
  error: "",
};

export const filterProducts = createAsyncThunk(
  "product/filterProducts",
  async (_, { getState, dispatch }) => {
    const currentState = getState() as RootState;
    const {
      orderBy,
      selectedColors,
      selectedTypes,
      selectedBrands,
      selectedSex,
    } = currentState.product;

    dispatch(setPageNumber(defaultPageNumber));
    dispatch(saveSearchText(defaultSearchText));

    const response = await axios.get(fullProductsUrl, {
      params: {
        orderBy: orderBy,
        colors: selectedColors.join(separator),
        types: selectedTypes.join(separator),
        brands: selectedBrands.join(separator),
        searchKey: defaultSearchText,
        pageNumber: defaultPageNumber.toString(),
        sex: selectedSex,
      },
    });

    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (_, { getState, dispatch }) => {
    const currentState = getState() as RootState;
    const { orderBy, searchText } = currentState.product;

    dispatch(clearAllFiltersOnUI());
    dispatch(setPageNumber(defaultPageNumber));

    const response = await axios.get(fullProductsUrl, {
      params: {
        searchKey: searchText,
        pageNumber: defaultPageNumber.toString(),
        orderBy: orderBy,
      },
    });

    return response.data;
  }
);

export const sortProducts = createAsyncThunk(
  "product/sortProducts",
  async (_, { getState, dispatch }) => {
    const currentState = getState() as RootState;
    const {
      orderBy,
      selectedColors,
      selectedTypes,
      selectedBrands,
      selectedSex,
      searchText,
    } = currentState.product;

    dispatch(setPageNumber(defaultPageNumber));

    const response = await axios.get(fullProductsUrl, {
      params: {
        orderBy: orderBy,
        colors: selectedColors.join(separator),
        types: selectedTypes.join(separator),
        brands: selectedBrands.join(separator),
        searchKey: searchText,
        pageNumber: defaultPageNumber.toString(),
        sex: selectedSex,
      },
    });

    return response.data;
  }
);

export const pageProducts = createAsyncThunk(
  "product/pageProducts",
  async (_, { getState, dispatch }) => {
    const currentState = getState() as RootState;
    const {
      orderBy,
      selectedColors,
      selectedTypes,
      selectedBrands,
      selectedSex,
      searchText,
      pageNumber,
    } = currentState.product;

    const response = await axios.get(fullProductsUrl, {
      params: {
        orderBy: orderBy,
        colors: selectedColors.join(separator),
        types: selectedTypes.join(separator),
        brands: selectedBrands.join(separator),
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
    const response = await axios.get(getFiltersUrl);

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
    clearAllFiltersOnUI: (state) => {
      state.selectedColors = [];
      state.selectedTypes = [];
      state.selectedBrands = [];
      state.selectedSex = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(filterProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.productList;
        state.pageCount = action.payload.numberOfPages;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.productList;
        state.pageCount = action.payload.numberOfPages;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sortProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.productList;
        state.pageCount = action.payload.numberOfPages;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(pageProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(pageProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.productList;
        state.pageCount = action.payload.numberOfPages;
      })
      .addCase(pageProducts.rejected, (state, action) => {
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
export const selectSearchText = (state: RootState) => state.product.searchText;

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
  clearAllFiltersOnUI,
} = productSlice.actions;

export default productSlice.reducer;
