import { createSlice } from '@reduxjs/toolkit';
import { BookFilterStatus } from '@/common/constants';


const initialState = {
  books: [],
  bookFilterStatus: BookFilterStatus.ALL.value,
  isLoading: false,
};

const userHomeSlice = createSlice({
  name: 'userHome',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload.books;
      state.isLoading = false;
    },
    setBookFilterStatus: (state, action) => {
      state.bookFilterStatus = action.payload.bookFilterStatus;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setIsLoading, setBooks, setBookFilterStatus } = userHomeSlice.actions;

// selectors
export const selectIsLoading = (state) => state.userHome.isLoading;
export const selectBooks = (state) => state.userHome.books;
export const selectBookFilterStatus = (state) => state.userHome.bookFilterStatus;


export default userHomeSlice.reducer;