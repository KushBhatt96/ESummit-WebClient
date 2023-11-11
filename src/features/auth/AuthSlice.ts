import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import AppUser from "../../models/AppUser";

interface AuthState {
  isLoggedIn: boolean;
  appUser: AppUser | undefined;
}

const initialState: AuthState = {
  isLoggedIn: false,
  appUser: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.appUser = action.payload as AppUser;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.appUser = undefined;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
