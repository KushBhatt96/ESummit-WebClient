import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import AppUser from "../../models/AppUser";
import axios from "axios";
import { clearCartFromMemory } from "../cart/CartSlice";

// CONSTANTS
const baseUrl = "http://localhost:5119/api";

// STATE
interface AuthState {
  status: string;
  isLoggedIn: boolean;
  appUser: AppUser | undefined;
  error: string | undefined;
}

const initialState: AuthState = {
  status: "idle",
  isLoggedIn: false,
  appUser: undefined,
  error: "",
};

// THUNKS
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    const request = async () =>
      await axios.post(
        `${baseUrl}/Account/Logout`,
        {},
        {
          withCredentials: true,
        }
      );

    const refresh = async () =>
      await axios(`${baseUrl}/Token/Refresh`, {
        method: "post",
        withCredentials: true,
      });
    try {
      const { data } = await request();

      dispatch(clearCartFromMemory());

      return data;
    } catch (error: any) {
      if (error.status === 401) {
        try {
          await refresh();
        } catch (error: any) {
          if (error.status === 400) {
            dispatch(logoutOffline());
            dispatch(clearCartFromMemory());
          }
          throw error;
        }

        const { data } = await request();
        dispatch(clearCartFromMemory());
        return data;
      } else {
        throw error;
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.appUser = action.payload as AppUser;
    },
    logoutOffline: (state) => {
      state.isLoggedIn = false;
      state.appUser = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.appUser = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const { login, logoutOffline } = authSlice.actions;

export default authSlice.reducer;
