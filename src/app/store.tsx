import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/userSlice";

const rootReducer = {
  users: userReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
