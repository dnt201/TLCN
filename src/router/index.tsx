import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@app/store";
import Home from "@screens/Home";
import UserDetail from "@screens/UserDetail";
import Login from "@screens/Auth/Login";
import BlogDetail from "@screens/BlogDetail";
import BlogCreate from "@screens/BlogCreate";
import SomeThingWentWrong from "@screens/SomeThingWentWrong";
import Me from "@screens/Me";
import Register from "@screens/Auth/Register";
import ProtectedRoute from "src/router/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Notify from "@icons/NotifyFill";
import App from "src/App";
import {
  clearAllUser,
  resetUserState,
  userGetMe,
  userLogin,
} from "@redux/userSlice";
import NetWorkError from "@screens/NetWorkError";
import ChangePassWord from "@screens/ChangePassWord";
import Search from "@screens/Search";

import io, { Socket } from "socket.io-client";
import { disconnectSocket, initiateSocketConnection, SocketOn } from "./Socket";
import Tags from "@screens/Tags";
import { listChose } from "@screens/Home/LeftContent";
import Categories from "@screens/Categories";
import EditPost from "@screens/EditPost";
import ListPostByCategory from "@screens/ListPostByCategory";
import ListPostByTag from "@screens/ListPostByTag";
import ForgotPassWord from "@screens/Auth/ForgotPassWord";
const DeClareRouter = () => {
  const { error, accessToken, userInfo } = useSelector(
    (state: RootState) => state.users
  );
  const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
  const [beLogged, setLogged] = useState(accessTokenFromLocalStorage !== null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);

  // const eventClear = () => {
  //   dispatch(clearAllUser());
  //   navigate("/login");
  // };
  React.useEffect(() => {
    window.addEventListener("storage", (e) => {
      // eventClear();
    });
  }, []);
  React.useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
    if (
      accessTokenFromLocalStorage !== null &&
      accessTokenFromLocalStorage.length > 0
    ) {
      initiateSocketConnection(accessTokenFromLocalStorage);
      SocketOn();
      setLogged(true);

      if (userInfo === null && accessTokenFromLocalStorage)
        dispatch(userGetMe());
      // else dispatch(clearAllUser);
    }
    if (error && error === "Network Error") {
      navigate("/networkError");
    }
    if (accessToken === null) {
      navigate(0);
    }
    return () => {
      disconnectSocket();
    };
  }, [accessToken, accessTokenFromLocalStorage, setSocket]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}>
          {listChose.map((e) => (
            <Route key={e.href} path={e.href} element={<Home />} />
          ))}
          <Route path="" element={<Home />} />
          <Route path="blog" element={<BlogDetail />}>
            <Route path=":blogId" element={<BlogDetail />} />
          </Route>

          <Route path="notify" element={<Notify />} />
          <Route path="user-detail/:userId" element={<UserDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="tags" element={<Tags />} />
          <Route path="categories" element={<Categories />} />
          <Route
            path="/categories/:categoryId"
            element={<ListPostByCategory />}
          />
          <Route path="/tags/:tagId" element={<ListPostByTag />} />
          <Route
            path="change-password"
            element={
              <ProtectedRoute
                isAuthenticated={beLogged}
                outlet={<ChangePassWord />}
              />
            }
          />
          <Route path="*" element={<SomeThingWentWrong />} />
          <Route path="networkError" element={<NetWorkError />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute isAuthenticated={beLogged} outlet={<Me />} />
            }
          >
            {/* <Route path="posted" element={<div></div>} />
            <Route path="followed" element={<div></div>} />
            <Route path="voted" element={<div></div>} />
            <Route path="seen" element={<div></div>} /> */}
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassWord />} />

        <Route
          path="/edit-post/:postId"
          element={
            <ProtectedRoute isAuthenticated={beLogged} outlet={<EditPost />} />
          }
        />

        <Route
          path="/new-post"
          element={
            <ProtectedRoute
              isAuthenticated={beLogged}
              outlet={<BlogCreate />}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default DeClareRouter;
