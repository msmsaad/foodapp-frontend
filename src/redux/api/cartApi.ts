import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH, VERSION } from 'src/constants';
import { CartMeal, Cart } from '@types';
import { prepareHeaders } from '@utils/index';
import { setCart, setUser } from '@redux/slices/authSlice';
import qs from 'qs';

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
    getCart: builder.query<Cart>({
      query: () => ({
        url: 'cart',
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCart(data.carts_meals));
          dispatch(setUser(data.user));
        } catch {}
      },
    }),
    addToCart: builder.mutation<void, Cart>({
      query: mealAttributes => ({
        url: 'cart',
        method: 'PATCH',
        body: { carts_meals: { carts_meals_attributes: mealAttributes } },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCart(data.carts_meals));
        } catch {}
      },
    }),
    checkOut: builder.query<void, { success_url: string }>({
      query: ({ success_url }) => ({
        url: `cart/checkout?${qs.stringify({ success_url })}`,
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useLazyCheckOutQuery } =
  cartApi;
