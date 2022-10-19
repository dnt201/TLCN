import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/userSlice";

const rootReducer = {
  users: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
