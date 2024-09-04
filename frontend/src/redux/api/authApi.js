import config from "@/common/config";
import { Role } from "@/common/constants";
import { toastSuccess, toastError } from "@/common/toast";
import { setIsLoading, setCredentials, unsetCredentials } from "@/redux/features/authSlice";
import { handleFetch } from "@/common/api";
import { navigate } from "@/common/navigation";


export const login = (role, data) => async (dispatch) => {
    try {
      await dispatch(setIsLoading({isLoading:true}));
      let url;
      if (role === Role.ADMIN) {
        url = `${config?.baseUrl}/api/admin/auth/login`;
      } else {
        url = `${config?.baseUrl}/api/user/auth/login`;
      }
      
      const method = 'POST';
      const response = await handleFetch(url, method, data, true);
      console.log("login response", response);

      await dispatch(setCredentials({
        accessToken: response?.access_token,
        user: response?.user,
        role: response?.role,
        isAuthenticated: true
      }));

      toastSuccess('Login success');
      if (response?.role === Role.ADMIN) {
        await navigate('/admin/dashboard')
      } else if (response?.role === Role.USER) {
        await navigate('/user/dashboard')
      }
    } catch (error) {
      await dispatch(setIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError(error?.message);
    }
};

export const register = (role, data) => async (dispatch) => {
    try {
      await dispatch(setIsLoading({isLoading:true}));
      let url;
      if (role === Role.ADMIN) {
        url = `${config?.baseUrl}/api/admin/auth/register`;
      } else {
        url = `${config?.baseUrl}/api/user/auth/register`;
      }
      
      const method = 'POST';
      const response = await handleFetch(url, method, data, true)
      console.log("register response", response);

      await dispatch(setCredentials({
        accessToken: response?.access_token,
        user: response?.user,
        role: response?.role,
        isAuthenticated: true
      }));

      toastSuccess('Register success');
      if (response?.role === Role.ADMIN) {
        await navigate('/admin/dashboard');
      } else if (response?.role === Role.USER) {
        await navigate('/user/dashboard');
      }
    } catch (error) {
      await dispatch(setIsLoading({isLoading:false}));
      console.error('UnknownError:', error);
      toastError(error?.message);
    }
};

export const logout = () => async (dispatch) => {
    dispatch(unsetCredentials());
    await navigate('/login');
}