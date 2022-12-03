import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/userSlice";
import postTagsReducer from "@redux/postTagSlice";
import categoryReducer from "@redux/categorySlice";
import blogReducer from "@redux/blogSlice";

const rootReducer = {
  users: userReducer,
  postTags: postTagsReducer,
  category: categoryReducer,
  blog: blogReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
