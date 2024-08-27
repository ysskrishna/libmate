"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }) {
  console.log('Store in Providers:', store);
  return <Provider store={store}>{children}</Provider>;
}