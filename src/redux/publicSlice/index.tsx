import axiosClient from "@api/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const userLogin = createAsyncThunk(
//   "user/login",
//   async (user: userApiAuth) => {
//     //thunkAPI.dispatch();
//     try {
//       const result = await userApi.login(user);
//       return result.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// export const userLogout = createAsyncThunk("user/logout", async () => {
//   //thunkAPI.dispatch();
//   try {
//     const result = await userApi.logout();
//     return result.status;
//   } catch (err) {
//     console.log(err);
//   }
// });

// export const userRegister = createAsyncThunk(
//   "user/register",
//   async (user: userApiAuth) => {
//     //thunkAPI.dispatch();
//     try {
//       const result = await userApi.register(user);
//       return result.data;
//     } catch (err) {
//       // custom error
//       console.log(err);
//     }
//   }
// );
// export const userGetMe = createAsyncThunk("user/getMe", async () => {
//   //thunkAPI.dispatch();
//   try {
//     const result = await userApi.getMe();
//     if (result.data) return result.data;
//     return result;
//   } catch (err) {
//     console.log("getMe error$", err);

//     // custom error
//   }
// });
// export const userUpdateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async () => {
//     try {
//       const result = await userApi.getMe();
//       return result.data;
//     } catch (err) {
//       // custom error
//       console.log(err);
//     }
//   }
// );
// const userInfo = localStorage.getItem("userInfo");
// let userInfoFromStorage = null;
// if (userInfo && userInfo !== null && userInfo !== undefined)
//   userInfoFromStorage = JSON.parse(userInfo);
// // Define a type for the slice state
// interface userSlice {
//   accessToken: string;
//   refreshToken: string;
//   userInfo: {
//     id: string;
//     email: string;
//     username: string;
//     shortInfo: string;
//     phoneNumber: null;
//     gender: string;
//     role: {
//       id: string;
//       role: string;
//       displayName: string;
//     };
//     follower: number;
//     following: number;
//     avatarLink: null;
//   } | null;
//   loading: boolean;
//   error: string;
//   message: string;
// }

// const accessToken = localStorage.getItem("accessToken");
// const refreshToken = localStorage.getItem("refreshToken");
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
      console.log("Set message");
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
