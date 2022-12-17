import axiosClient from "@api/axiosClient";
import postTagApi from "@api/postTagApi";
import userApi, { userApiAuth } from "@api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { iTag, iPage } from "src/DTO";
export const getAllPostTag = createAsyncThunk(
  "postTag/getAllPostTag",
  async ({ pageNum, nameTag }: { pageNum: number; nameTag: string }) => {
    //thunkAPI.dispatch();
    try {
      let result;
      if (nameTag !== undefined && nameTag.length <= 0) {
        result = await postTagApi.getAllPostTag(pageNum);
      } else result = await postTagApi.getAllPostTag(pageNum, nameTag);

      return result.data.result;
    } catch (err) {}
  }
);

// Define a type for the slice state
interface postTagSlice {
  listTag: iTag[];
  page: iPage | null;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: postTagSlice = {
  listTag: [],
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
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(getAllPostTag.pending, (state, action) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getAllPostTag.fulfilled, (state, action) => {
      if (action.payload.data && action.payload.page) {
        state.listTag = action.payload.data;
        state.page = action.payload.page;
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
