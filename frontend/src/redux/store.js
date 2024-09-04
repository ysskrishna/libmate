import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/authSlice';
import booksReducer from '@/redux/features/booksSlice';
import userHomeReducer from '@/redux/features/userHomeSlice';
import userCartReducer from '@/redux/features/userCartSlice';

export const store = configureStore({
    reducer: {
      auth: authReducer,
      books: booksReducer,
      userHome: userHomeReducer,
      userCart: userCartReducer,
    }
  });