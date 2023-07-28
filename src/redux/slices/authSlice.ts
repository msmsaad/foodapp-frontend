import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  email: string;
  name: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
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
  },
});

export const { setUser, setToken, logout } = slice.actions;
export const authReducer = slice.reducer;
