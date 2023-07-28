import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH, VERSION } from 'src/constants';
import { CartResponse, CartMealAttributes } from '@types';
import { prepareHeaders } from '@utils/index';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}${VERSION}/`,
    prepareHeaders: headers => {
      const customHeaders = prepareHeaders();
      Object.entries(customHeaders).forEach(([key, value]) =>
        headers.set(key, value)
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    getCart: builder.query<CartResponse>({
      query: () => ({
        url: 'cart',
      }),
    }),
    addToCart: builder.mutation<void, CartMealAttributes>({
      query: mealAttributes => ({
        url: 'cart',
        method: 'PATCH',
        body: { carts_meals: { carts_meals_attributes: mealAttributes } },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation } = cartApi;
