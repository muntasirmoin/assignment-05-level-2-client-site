import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export type TUSer = {
  userId: string;
  role: string;
  initialState: number;
  name?: string;
  email?: string;
  exp: number;
};

type TAuthState = {
  user: null | TUSer;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// need to update here start [remove comment]
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
// need to update here end
