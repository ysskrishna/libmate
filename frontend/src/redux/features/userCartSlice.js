import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  isLoading: false,
};

const userCartSlice = createSlice({
  name: 'userCart',
  initialState,
  reducers: {
    setCartBooks: (state, action) => {
      state.books = action.payload.books
      state.isLoading = false;
    },
    addBookToCart: (state, action) => {
      state.books = [...state.books, action.payload.book];
    },
    deleteBookFromCart: (state, action) => {
      state.books = state.books.filter(book => book.book_id !== action.payload.book_id);
    },
    setCartIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setCartIsLoading, setCartBooks, addBookToCart, deleteBookFromCart } = userCartSlice.actions;

// selectors
export const selectCartIsLoading = (state) => state.userCart.isLoading;
export const selectCartBooks = (state) => state.userCart.books;


export default userCartSlice.reducer;