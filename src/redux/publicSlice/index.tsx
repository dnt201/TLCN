import { createSlice } from "@reduxjs/toolkit";

interface publicState {
  message: string;
  error: string;
}
const initialState: publicState = {
  message: "",
  error: "",
};
const publicState = createSlice({
  name: "publicState",
  initialState,
  reducers: {
    setMessagePublicState: (state, action) => {
      if (action.payload) state.message = action.payload;
    },
    setErrorPublicState: (state, action) => {
      if (action.payload) state.error = action.payload;
    },
    resetPublicState: (state) => {
      state.message = "";
      state.error = "";
    },
  },
});
const { reducer, actions } = publicState;
export const { setMessagePublicState, setErrorPublicState, resetPublicState } =
  actions;
export default reducer;
