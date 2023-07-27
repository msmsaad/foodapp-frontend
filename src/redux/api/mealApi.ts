import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { API_PATH, VERSION } from 'src/constants';
import { MealsResponse } from '@types';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_PATH}${VERSION}/` }),
  endpoints: builder => ({
    getMeals: builder.query<MealsResponse, { category: string; page: number }>({
      query: ({ category, page }) => ({
        url: `meals?${qs.stringify({ category, page })}`,
      }),
    }),
  }),
});

export const { useGetMealsQuery } = mealApi;
