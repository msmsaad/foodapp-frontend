import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { categoryReducer } from './slices/categorySlice';
import { mealApi } from './api';

const combinedReducer = combineReducers({
  categories: categoryReducer,
  [mealApi.reducerPath]: mealApi.reducer,
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
