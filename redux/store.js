import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import discoverReducer from "./slices/discover";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    discover: discoverReducer,
  },
});
