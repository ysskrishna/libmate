import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
  persistStore,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '@/redux/features/authSlice';
import booksReducer from '@/redux/features/booksSlice';
import userHomeReducer from '@/redux/features/userHomeSlice';
import userCartReducer from '@/redux/features/userCartSlice';


const persistConfig = { key: "root", storage, version: 1 };
const appReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  userHome: userHomeReducer,
  userCart: userCartReducer,
});

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = initialState
  }

  return appReducer(state, action)
}

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
        },
      }),
  });

export const persistor = persistStore(store); 
