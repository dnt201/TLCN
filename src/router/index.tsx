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
import { userGetMe, userLogin } from "@redux/userSlice";
import NetWorkError from "@screens/NetWorkError";
import ChangePassWord from "@screens/ChangePassWord";
import Search from "@screens/Search";

import io, { Socket } from "socket.io-client";
import {
  disconnectSocket,
  initiateSocketConnection,
  Post_Vote,
} from "./Socket";
import Tags from "@screens/Tags";
import { listChose } from "@screens/Home/LeftContent";
import Categories from "@screens/Categories";
const DeClareRouter = () => {
  const { error, accessToken } = useSelector((state: RootState) => state.users);
  const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
  const [beLogged, setLogged] = useState(accessTokenFromLocalStorage !== null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);

  React.useEffect(() => {
    // console.log("Access thay đổi");
    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
    if (
      accessTokenFromLocalStorage !== null &&
      accessTokenFromLocalStorage.length > 0
    ) {
      initiateSocketConnection(accessTokenFromLocalStorage);

      // console.log("socket", socket);
      // console.log("connected", socket.connected);

      // socket.on("Post_Vote", (res) => {
      //   console.log("ok");
      //   console.log("res", res);
      // });

      // setSocket(socket);
      Post_Vote();
      setLogged(true);
      dispatch(userGetMe());
    } else setLogged(false);
    if (error && error === "Network Error") {
      navigate("networkError");
    }
    return () => {
      disconnectSocket();
    };
  }, [accessToken, error, setSocket]);
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
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
