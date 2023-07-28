import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../types/Cart';

export type User = {
  email: string;
  name: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  cart: Cart | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  cart: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    },
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
  },
});

export const { setUser, setToken, logout, setCart } = slice.actions;
export const authReducer = slice.reducer;
