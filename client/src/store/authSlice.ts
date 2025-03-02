// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
}

// Get the token from session storage
const token = sessionStorage.getItem("token");

// Decode the token to get user information (if token exists)
const initialState: AuthState = token
  ? {
      user: {
        id: jwtDecode<{ _id: string; username: string; role: string }>(token)
          ._id,
        ...jwtDecode<{ _id: string; username: string; role: string }>(token),
      },
      token,
    }
  : {
      user: null,
      token: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token"); // Clear token from session storage
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
