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

const DeClareRouter = () => {
  const { error, accessToken } = useSelector((state: RootState) => state.users);
  const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
  const [beLogged, setLogged] = useState(accessTokenFromLocalStorage !== null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("Access thay đổi");
    const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
    if (
      accessTokenFromLocalStorage !== null &&
      accessTokenFromLocalStorage.length > 0
    ) {
      setLogged(true);
      dispatch(userGetMe());
    } else setLogged(false);
    if (error && error === "Network Error") {
      navigate("networkError");
    }
  }, [accessToken, error]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="blog" element={<BlogDetail />}>
            <Route path=":blogId" element={<BlogDetail />} />
          </Route>

          <Route path="notify" element={<Notify />} />
          <Route path="user-detail/:userId" element={<UserDetail />} />
          <Route path="change-password" element={<ChangePassWord />} />
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
