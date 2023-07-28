import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './rootReducer';
import { apiErrorMiddleware } from './middlewares/ApiMiddleware';
import { mealApi, cartApi, authApi } from './api';


export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(apiErrorMiddleware)
        .concat(mealApi.middleware)
        .concat(cartApi.middleware),
        .concat(authApi.middleware),
    devTools: true,
  });
export const store = makeStore();

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {});

export type RootState = ReturnType<typeof store.getState>;
