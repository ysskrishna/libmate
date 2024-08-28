import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   role: null,
//   isAuthenticated: false,
//   accessToken: null,
//   user: null,
//   isLoading: false,
// };

const initialState = {
  role: 'admin',
  isAuthenticated: true,
  accessToken: 'some-token',
  user: {
    name: 'Siva',
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { role, isAuthenticated, accessToken } = action.payload;
      state.role = role;
      state.isAuthenticated = isAuthenticated;
      state.accessToken = accessToken;
      state.user = user;
      state.isLoading = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading
    },
    logout: (state) => {
      state.role = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setIsLoading, logout } = authSlice.actions;

// selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRole = (state) => state.auth.role;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;