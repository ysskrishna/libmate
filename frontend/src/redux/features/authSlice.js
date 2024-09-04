import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   role: null,
//   isAuthenticated: false,
//   accessToken: null,
//   user: null,
//   isLoading: false,
// };


const initialState = {
  role: 'user',
  isAuthenticated: true,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGdtYWlsLmNvbSIsImV4cCI6MTcyNTMwOTQzNywicm9sZSI6InVzZXIifQ.Rir69uHAJy1L1tLAezGsROuvjlJy7PMBWuzvjcqvIIA",
  user: {
    "name": "John"
  },
  isLoading: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.role = action.payload?.role;
      state.isAuthenticated = action.payload?.isAuthenticated;
      state.accessToken = action.payload?.accessToken;
      state.user = action.payload?.user;
      state.isLoading = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading
    },
    unsetCredentials: (state) => {
      state.role = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setIsLoading, unsetCredentials } = authSlice.actions;

// selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRole = (state) => state.auth.role;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;