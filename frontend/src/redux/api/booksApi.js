import config from "@/common/config";
import { toastSuccess, toastError } from "@/common/toast";
import { setIsLoading, setBooks } from "@/redux/features/booksSlice";
import { handleFetch } from "@/common/api";

export const getAllBooks = () => async (dispatch) => {
    try {
      await dispatch(setIsLoading({isLoading:true}));
      let url = `${config?.baseUrl}/api/book/all`;
      const method = 'GET';
      const response = await handleFetch(url, method)
      console.log("Get Books response", response);

      await dispatch(setBooks({books: response}));
    } catch (error) {
      await dispatch(setIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError(error?.message);
    }
};


export const createNewBook = (data, onSuccess) => async (dispatch) => {
  try {
    await dispatch(setIsLoading({isLoading:true}));
    let url = `${config?.baseUrl}/api/book/`;
    const method = 'POST';
    const response = await handleFetch(url, method, data);
    console.log("Create Book response", response);
    
    toastSuccess('Book created successfully');
    onSuccess();
  } catch (error) {
    await dispatch(setIsLoading({isLoading:false}));
    console.error('UnknownError:', error);
    toastError(error?.message);
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  try {
    await dispatch(setIsLoading({isLoading:true}));
    let url = `${config?.baseUrl}/api/book/${bookId}`;
    const method = 'DELETE';
    const response = await handleFetch(url, method);
    console.log("Delete Book response", response);
    
    toastSuccess('Book deleted successfully');
  } catch (error) {
    await dispatch(setIsLoading({isLoading:false}));
    console.error('UnknownError:', error);
    toastError(error?.message);
  }
};