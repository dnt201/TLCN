import axiosClient from "@api/axiosClient";
import userApi, { userApiAuth } from "@api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "user/login",
  async (user: userApiAuth) => {
    //thunkAPI.dispatch();
    try {
      const result = await userApi.login(user);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userLogout = createAsyncThunk("user/logout", async () => {
  //thunkAPI.dispatch();
  try {
    const result = await userApi.logout();
    console.log("logout success");
    return result.status;
  } catch (err) {
    console.log(err);
  }
});

export const userRegister = createAsyncThunk(
  "user/register",
  async (user: userApiAuth) => {
    //thunkAPI.dispatch();
    try {
      const result = await userApi.register(user);
      return result.data;
    } catch (err) {
      // custom error
      console.log(err);
    }
  }
);
export const userGetMe = createAsyncThunk("user/getMe", async () => {
  //thunkAPI.dispatch();
  try {
    const result = await userApi.getMe();
    return result.data;
  } catch (err) {
    // custom error
    console.log(err);
  }
});
export const userUpdateProfile = createAsyncThunk(
  "user/updateProfile",
  async () => {
    try {
      const result = await userApi.getMe();
      return result.data;
    } catch (err) {
      // custom error
      console.log(err);
    }
  }
);
const userInfo = localStorage.getItem("userInfo");
let userInfoFromStorage = null;
if (userInfo && userInfo !== null && userInfo !== undefined)
  userInfoFromStorage = JSON.parse(userInfo);
// Define a type for the slice state
interface userSlice {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    id: string;
    email: string;
    username: string;
    shortInfo: string;
    phoneNumber: null;
    gender: string;
    role: {
      id: string;
      role: string;
      displayName: string;
    };
    follower: number;
    following: number;
    avatarLink: null;
  } | null;
  loading: boolean;
  error: string;
  message: string;
}

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const initialState: userSlice = {
  accessToken: accessToken || "",
  refreshToken: refreshToken || "",
  userInfo: null,
  loading: false,
  error: "",
  message: "",
};
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetUserState: (state) => {
      console.log("resetState");
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action);
      state.error = "";
      state.message = "";

      state.loading = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      // state.userInfo = action.payload.data;
      state.error = "";

      if (action.payload.statusCode === 401) {
        state.error = action.payload.message;
        console.log(action.payload.message);
      } else if (
        action.payload.statusCode === 400 &&
        action.payload.message ===
          "Please confirm email before login to the system"
      ) {
        console.log(action.payload);
        state.error =
          action.payload.message + ". We will redirect to confirm form!";
      } else if (
        action.payload.accessToken !== null &&
        action.payload.accessToken !== undefined &&
        action.payload.accessToken.length > 0
      ) {
        state.message = "Login successful";
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        // console.log("faffafsa", userApi.getMe());
      }
    });
    //logout
    builder.addCase(userLogout.pending, (state, action) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.error = "";
      state.message = "";
      state.loading = false;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      if (action.payload === 200) {
        state.loading = false;
        state.error = "";
        state.accessToken = "";
        state.refreshToken = "";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    });
    //register
    builder.addCase(userRegister.pending, (state, action) => {
      // console.log("pending", action);
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error && action.payload.message) {
        state.error = action.payload.message;
      } else
        state.message =
          "Create account success! You will have email to confirm!";
    });
    //register
    builder.addCase(userGetMe.pending, (state, action) => {
      state.loading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(userGetMe.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id !== null && action.payload.email !== null)
        state.userInfo = action.payload;
    });
  },
});
const { reducer, actions } = user;
export const { setMessage, resetUserState } = actions;
export default reducer;
