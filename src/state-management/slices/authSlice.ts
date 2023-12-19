import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export interface AuthState {
  access_token: string | null;
  refresh_token?: string | null;
}

const initialState: AuthState = {
  access_token: Cookies.get('access_token') || null,
  refresh_token: Cookies.get('refresh_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
