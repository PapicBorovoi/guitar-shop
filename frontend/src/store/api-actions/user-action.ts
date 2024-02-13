import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserLogin, UserRegister } from '../../types/user.type';
import { AppDispatch, State } from '../../types/store.type';
import { AxiosInstance } from 'axios';
import { ApiRoutes } from '../../types/api-routes.enum';
import { setToken } from '../token';

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const response = await api.get<User>(ApiRoutes.Check);
  return response.data;
});

export const registerAction = createAsyncThunk<
  User,
  UserRegister,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/register', async (user, { extra: api }) => {
  const response = await api.post<User>(ApiRoutes.Register, user);
  setToken(response.data.accessToken);
  return response.data;
});

export const loginAction = createAsyncThunk<
  User,
  UserLogin,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async (user, { extra: api }) => {
  const response = await api.post<User>(ApiRoutes.Login, user);
  setToken(response.data.accessToken);
  return response.data;
});
