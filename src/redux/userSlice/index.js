import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
  },
});
const { reducer, actions } = user;
export const { login } = actions;
export default reducer;
