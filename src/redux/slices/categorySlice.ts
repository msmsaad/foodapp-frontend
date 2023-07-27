// categorySlice.ts

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@types';

export type CategoryState = {
  categories: Category[] | [];
  loading: boolean;
};

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<Category[] | []>) => {
      state.categories = payload;
    },
    setCategoryLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
  },
});

export const { setCategories, setCategoryLoading } = slice.actions;
export const categoryReducer = slice.reducer;
