import axiosClient from "@api/axiosClient";
import categoryApi from "@api/categoryApi";
// import userApi, { userApiAuth } from "@api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { iPage, iCategory } from "src/DTO";
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async ({
    pageNum,
    nameCategory,
  }: {
    pageNum: number;
    nameCategory: string;
  }) => {
    //thunkAPI.dispatch();
    try {
      let result;
      if (nameCategory !== undefined && nameCategory.length <= 0) {
        result = await categoryApi.getAllCategory(pageNum);
      } else result = await categoryApi.getAllCategory(pageNum, nameCategory);

      return result.data.result;
    } catch (err) {
      console.log(err);
    }
  }
);

// Define a type for the slice state
interface categorySlice {
  listCategory: iCategory[];
  pageCategory: iPage | null;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: categorySlice = {
  listCategory: [],
  pageCategory: null,
  loading: false,
  error: "",
  message: "",
};
const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryMessage: (state, action) => {
      state.message = action.payload;
    },
    resetCategoryState: (state) => {
      console.log("resetState");
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(getAllCategory.pending, (state, action) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload.data && action.payload.page) {
        console.log(action);
        state.listCategory = action.payload.data;
        state.pageCategory = action.payload.page;
        state.error = "";
        state.message = "";
      } else {
        state.error = "Something went wrong, f5 to refresh";
      }
      state.loading = false;
    });
  },
});
const { reducer, actions } = category;
export const { resetCategoryState, setCategoryMessage } = actions;
export default reducer;
