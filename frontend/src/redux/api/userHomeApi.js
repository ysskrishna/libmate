import config from "@/common/config";
import { toastSuccess,toastError } from "@/common/toast";
import { handleFetch } from "@/common/api";
import { setIsLoading, setBooks, setBookFilterStatus } from "@/redux/features/userHomeSlice";

export const getUserHomeBooks = (status) => async (dispatch) => {
    try {
      await dispatch(setIsLoading({isLoading:true}));
      await dispatch(setBookFilterStatus({bookFilterStatus: status}));
      let url = `${config?.baseUrl}/api/booktransaction/user?status=${status}`;
      const method = 'GET';
      const response = await handleFetch(url, method)
      console.log("Get User Home Books response", response);

      await dispatch(setBooks({books: response}));
    } catch (error) {
      await dispatch(setIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError(error?.message);
    }
};

export const returnBook = (data) => async (dispatch) => {
    try {
      await dispatch(setIsLoading({isLoading:true}));
      let url = `${config?.baseUrl}/api/booktransaction/return`;
      const method = 'POST';
      const response = await handleFetch(url, method, data)
      console.log("Return user book response", response);
      toastSuccess('Book returned successfully');
    } catch (error) {
      await dispatch(setIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError(error?.message);
    }
};