import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/namespace.enum';
import { AuthStatus } from '../../types/auth-status.enum';
import {
  checkAuthAction,
  loginAction,
  registerAction,
} from '../api-actions/user-action';
import { User } from '../../types/user.type';

const initialState = {
  user: null,
  authStatus: AuthStatus.Unknown,
} as {
  user: User | null;
  authStatus: AuthStatus;
};

export const userSlice = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = null;
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.user = null;
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(registerAction.rejected, (state) => {
        state.user = null;
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});
