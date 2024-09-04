import config from "@/common/config";
import { toastSuccess, toastError } from "@/common/toast";
import { handleFetch } from "@/common/api";
import { setCartIsLoading, setCartBooks } from "@/redux/features/userCartSlice";
import { navigate } from "@/common/navigation";

export const checkoutBooks = (data) => async (dispatch) => {
    try {
      await dispatch(setCartIsLoading({isLoading:true}));
      let url = `${config?.baseUrl}/api/booktransaction/checkout`;
      const method = 'POST';
      const response = await handleFetch(url, method, data)
      await dispatch(setCartBooks({books: []}));
      console.log("Checkout user book response", response);
      toastSuccess('Book checkout successfully');
      await navigate('/user/dashboard');
    } catch (error) {
      await dispatch(setCartIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError(error?.message);
    }
};