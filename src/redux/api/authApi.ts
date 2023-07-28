import { setUser, logout } from '@redux/slices/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'src/constants';
import { User } from '../slices/authSlice';
import { prepareHeaders } from '@utils/index';

const removeHeaders = () => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}/`,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === 'signOut') {
        const customHeaders = prepareHeaders();
        Object.entries(customHeaders).forEach(([key, value]) =>
          headers.set(key, value)
        );
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    signIn: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: 'auth/sign_in',
        method: 'POST',
        body: { email, password },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const {
            data: { data },
            meta: {
              response: { headers },
            },
          } = response;
          localStorage.setItem('access-token', headers.get('access-token'));
          localStorage.setItem('client', headers.get('client'));
          localStorage.setItem('uid', headers.get('uid'));
          dispatch(setUser(data));
        } catch {
          dispatch(logout());
        }
      },
    }),
    signUp: builder.mutation<
      { token: string; user: User },
      { email: string; name: string; password: string }
    >({
      query: ({ email, name, password }) => ({
        url: 'auth',
        method: 'POST',
        body: { email, name, password },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const {
            data: { data },
            meta: {
              response: { headers },
            },
          } = response;
          localStorage.setItem('access-token', headers.get('access-token'));
          localStorage.setItem('client', headers.get('client'));
          localStorage.setItem('uid', headers.get('uid'));
          dispatch(setUser(data));
        } catch {
          dispatch(logout());
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/sign_out',
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          removeHeaders();
          dispatch(logout());
        } catch {}
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  authApi;
