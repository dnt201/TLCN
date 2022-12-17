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
interface iNotify {
  id: string;
  body: string;
  type: string;
  userId: string;
  timeOut: number;
  maxAttempt: number;
  lastSent: string;
  status: string;
  refType: string;
  refId: string;
  isClicked: false;
  extendData: {
    post: string;
    comment: string;
  } | null;

  userSend: {
    id: string;
    username: string;
    imageLink: null;
  };
}
interface notifySlice {
  listTag: iTag[];
  page: iPage | null;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: notifySlice = {
  listTag: [],
  page: null,
  loading: false,
  error: "",
  message: "",
};
const notifySlice = createSlice({
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
const { reducer, actions } = notifySlice;
export const { setPostTagMessage, resetPostTagState } = actions;
export default reducer;
