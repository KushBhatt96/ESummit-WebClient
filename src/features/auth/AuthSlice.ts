import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import AppUser from "../../models/AppUser";
import axios from "axios";
import { clearCartFromMemory } from "../cart/CartSlice";
import { ProfileUpdateDTO } from "../../models/ProfileUpdateDTO";
import { LocalStorageUser } from "../../models/LocalStorageUser";

// CONSTANTS
const baseUrl = "http://localhost:5119/api";

// STATE
interface AuthState {
  logoutStatus: string;
  updateStatus: string;
  isLoggedIn: boolean;
  appUser: AppUser | undefined;
  error: string | undefined;
}

const initialState: AuthState = {
  logoutStatus: "idle",
  updateStatus: "idle",
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

      dispatch(logoutOffline());
      dispatch(clearCartFromMemory());

      return data;
    } catch (error: any) {
      // If the token has expired, get a refresh token and try logging out again
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
        dispatch(logoutOffline());
        dispatch(clearCartFromMemory());
        return data;
      } else {
        throw error;
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: ProfileUpdateDTO) => {
    const response = await axios(`${baseUrl}/Profile/Update`, {
      method: "put",
      data: data,
      withCredentials: true,
    });

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.appUser = action.payload as AppUser;
      const localStorageUser: LocalStorageUser = {
        isLoggedIn: state.isLoggedIn,
        appUser: state.appUser,
      };
      localStorage.setItem("user", JSON.stringify(localStorageUser));
    },
    loadLocalStorageUser: (state, action: PayloadAction<LocalStorageUser>) => {
      const { isLoggedIn, appUser } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.appUser = appUser;
    },
    logoutOffline: (state) => {
      state.isLoggedIn = false;
      state.appUser = undefined;
      localStorage.removeItem("user");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutStatus = "succeeded";
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.appUser = action.payload as AppUser;
        const localStorageUser: LocalStorageUser = {
          isLoggedIn: state.isLoggedIn,
          appUser: state.appUser,
        };
        localStorage.setItem("user", JSON.stringify(localStorageUser));
      })
      .addCase(updateProfile.rejected, (state) => {
        state.updateStatus = "failed";
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLogoutStatus = (state: RootState) => state.auth.logoutStatus;
export const selectUpdateStatus = (state: RootState) => state.auth.updateStatus;

export const { login, logoutOffline, loadLocalStorageUser } = authSlice.actions;

export default authSlice.reducer;
