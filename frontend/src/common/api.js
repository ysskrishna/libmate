import { store } from "@/redux/store";
import { selectAccessToken } from "@/redux/features/authSlice";

export const handleFetch = async (url, method, body, isPublic=false) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (!isPublic) {
        const accessToken = selectAccessToken(store.getState());

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    
    if (!response.ok) {
      const errorjson = await response.json();
      let errorMessage;

      if (response.status === 422) {
        errorMessage = errorjson?.detail[0]?.msg;
      } else {
        errorMessage = errorjson?.detail;
      }

      if (!errorMessage) {
        errorMessage = 'An error occurred';
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }
    
    return response.json();
};

