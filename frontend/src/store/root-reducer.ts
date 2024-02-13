import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../types/namespace.enum';
import { userSlice } from './slices/user.slice';
import { itemsSlice } from './slices/items.slice';

export const rootReducer = combineReducers({
  [Namespace.User]: userSlice.reducer,
  [Namespace.Items]: itemsSlice.reducer,
});
