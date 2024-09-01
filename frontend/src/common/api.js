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
  
    return response.json();
};

