import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { API_PATH, VERSION } from 'src/constants';
import { CartResponse } from '@types';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_PATH}${VERSION}/` }),
  endpoints: builder => ({
    getCart: builder.query<CartResponse>({
      query: () => ({
        url: "cart",
      }),
    }),
  }),
});

export const { useGetCartQuery } = cartApi;
