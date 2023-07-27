// categorySlice.test.ts

import { AnyAction } from '@reduxjs/toolkit';
import { categoryReducer, setCategories } from './categorySlice';
import { categories } from '@mocks/categories'; // Import mock data

describe('categorySlice', () => {
  it('returns the initial state', () => {
    expect(categoryReducer(undefined, {} as AnyAction)).toEqual({
      categories: [],
      loading: false,
    });
  });

  describe('setCategories', () => {
    it('sets the categories', () => {
      const previousState = { categories: [], loading: false };
      expect(categoryReducer(previousState, setCategories(categories))).toEqual(
        {
          categories,
          loading: false,
        }
      );
    });
  });
});
