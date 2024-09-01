import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  isLoading: false,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload.books
      state.isLoading = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setIsLoading, setBooks } = booksSlice.actions;

// selectors
export const selectIsLoading = (state) => state.books.isLoading;
export const selectBooks = (state) => state.books.books;


export default booksSlice.reducer;