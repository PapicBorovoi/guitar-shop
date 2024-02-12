import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import createAPI from './api';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
