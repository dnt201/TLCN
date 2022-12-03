import axiosClient from "@api/axiosClient";
import postApi from "@api/postApi";
import postTagApi from "@api/postTagApi";
import userApi, { userApiAuth } from "@api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { iTag, iPage, iPostDetail } from "@DTO/index";
export const getPostDetailById = createAsyncThunk(
  "post/getPostDetailById",
  async (id: string) => {
    //thunkAPI.dispatch();
    try {
      const result = await postApi.getPostDetailById(id);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Define a type for the slice state
interface postSlice {
  post: iPostDetail | null;
  page: null;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: postSlice = {
  post: null,
  page: null,
  loading: false,
  error: "",
  message: "",
};
const postTag = createSlice({
  name: "postTag",
  initialState,
  reducers: {
    setPostTagMessage: (state, action) => {
      state.message = action.payload;
    },
    resetPostTagState: (state) => {
      console.log("resetState");
      state.message = "";
      state.error = "";
    },
    setFollow: (state, action) => {
      state.post = { ...state.post, ...action.payload };
    },
    setNumVote: (state, action) => {
      state.post = { ...state.post, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(getPostDetailById.pending, (state, action) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getPostDetailById.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload) {
        // state.listTag = action.payload.data;
        state.post = action.payload;
        state.error = "";
        state.message = "";
      } else {
        state.error = "Something went wrong, f5 to refresh";
      }
      state.loading = false;
    });
  },
});
const { reducer, actions } = postTag;
export const { setPostTagMessage, resetPostTagState } = actions;
export default reducer;
