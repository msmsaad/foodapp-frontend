import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './rootReducer';

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });
export const store = makeStore();

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {});

export type RootState = ReturnType<typeof store.getState>;
