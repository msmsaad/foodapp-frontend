import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { categoryReducer } from './slices/categorySlice';
import { mealApi, cartApi, authApi } from './api';
import { authReducer } from './slices/authSlice';

const combinedReducer = combineReducers({
  categories: categoryReducer,
  session: authReducer,
  [mealApi.reducerPath]: mealApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  }

  return combinedReducer(state, action);
};

export default rootReducer;
