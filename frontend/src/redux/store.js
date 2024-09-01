import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/authSlice';
import booksReducer from '@/redux/features/booksSlice';

export const store = configureStore({
    reducer: {
      auth: authReducer,
      books: booksReducer,
    }
  });