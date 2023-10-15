import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
