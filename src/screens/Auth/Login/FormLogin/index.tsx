import React from "react";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FastField,
} from "formik";
import userApi, { userApiAuth } from "@api/userApi";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { CheckCircle, ChevronLeft, XCircle } from "@icons/index";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@redux/userSlice";
import { AppDispatch, RootState } from "src/app/store";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
interface LoginFormValues {
  email: string;
  password: string;
}
interface iPropsLogin {
  pause: boolean;
  setStep: (step: number) => void;
}

const FormLogin: React.FC<iPropsLogin> = (props) => {
  const { pause, setStep } = props;
  const { loading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email sai định dạng")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(8, "Mật khẩu phải dài hơn 8 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });
  const handleSubmit = async (values: LoginFormValues) => {
    let user: userApiAuth = {
      email: values.email,
      password: values.password,
    };
    const a = await dispatch(userLogin(user));
    if (
      a.payload.message === "Please confirm email before login to the system"
    ) {
      setTimeout(() => {
        setStep(3);
      }, 1500);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => await handleSubmit(values)}
    >
      {({ values, errors, touched, setFieldError, resetForm, ...props }) => (
        <Form className="mt-4 flex flex-col pb-4">
          <div className="flex flex-col mb-2 mt-6 w-[280px]">
            <FastField
              className={
                "p-2  border-bg   rounded-md text-bg  border-[1px] text-sm   " +
                (!errors.email && values.email.length > 0
                  ? " border-yes text-yes "
                  : touched.email && errors.email
                  ? " border-no text-no placeholder:text-no   "
                  : "")
              }
              name="email"
              placeholder="Nhập email của bạn"
            />
            {touched.email && errors.email ? (
              <i className="ml-1 mt-[1px] text-no text-xs flex items-center ">
                <XCircle className="text-no w-4 h-4 mr-[1px]" />
                {errors.email}
              </i>
            ) : (
              values.email.length > 0 &&
              !errors.email && (
                <i className="ml-1 mt-[1px] text-yes text-xs flex items-center ">
                  <CheckCircle className="text-yes w-4 h-4 mr-[1px]" /> Verify
                </i>
              )
            )}
          </div>
          <div className="flex flex-col mb-3 ">
            <FastField
              className={
                "p-2 border-bg   rounded-md text-bg  border-[1px]  text-sm " +
                (!errors.password && values.password.length > 0
                  ? " border-yes text-yes "
                  : touched.password && errors.password
                  ? " border-no text-no  placeholder:text-no "
                  : "")
              }
              name="password"
              type="password"
              placeholder="Nhập password của bạn"
            />

            {touched.password && errors.password ? (
              <i className="ml-1 mt-[1px] text-no text-xs flex items-center ">
                <XCircle className="text-no w-4 h-4 mr-[1px]" />
                {errors.password}
              </i>
            ) : (
              values.password.length > 0 &&
              !errors.password && (
                <i className="ml-1 mt-[1px] text-yes text-xs flex items-center ">
                  <CheckCircle className="text-yes w-4 h-4 mr-[1px]" /> Verify
                </i>
              )
            )}
          </div>
          <div className="flex flex-row-reverse ">
            <button
              className={
                "relative bg-primary rounded-md flex-[2] ml-2 flex items-center " +
                (pause ||
                !props.isValid ||
                values.email.length <= 0 ||
                values.email.length <= 0
                  ? " cursor-not-allowed"
                  : null)
              }
              disabled={
                pause ||
                !props.isValid ||
                values.email.length <= 0 ||
                values.email.length <= 0
              }
              type="submit"
            >
              <span className="flex-1 text-center">Submit</span>
              <ClipLoader
                color={"#fff"}
                loading={loading}
                // cssOverride={override}
                size={16}
                className="absolute right-3  text-sm "
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
            <button
              className={
                "flex-1 border-[1px] border-bg text-bg bg-white rounded-md px-2 py-1 text-sm relative "
              }
              onClick={() => {
                console.log(props);
                setStep(1);
              }}
            >
              <ChevronLeft className="w-5 h-5 absolute left-1 top-1/2 -translate-y-1/2" />
              Back
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

/* <div className="w-full flex flex-col items-center">
              <input
                className="caret-primary w-3/4 border-[1px]   sm:w-[340px] text-bg2 bg-smoke border-smokeHover 
            mt-10 px-4 py-2 text-xs rounded-[9999px] transition-colors "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Địa chỉ email"
              />
              <input
                className="caret-primary w-3/4 border-[1px]   sm:w-[340px] text-bg2 bg-smoke border-smokeHover 
            mt-2 px-4 py-2 text-xs rounded-[9999px] transition-colors "
                placeholder="Mật khẩu"
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                type="password"
              />
              <div className="flex mt-4 w-3/4 flex-col sm:w-[340px] sm:flex-row ">
                <button
                  className="text-s relative items-center text-center bg-transparent text-bg w-3/4  border-[1px] sm:w-[150px] py-2 rounded-[9999px] mr-1"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
                  Back
                </button>
                <button
                  className=" text-s bg-primary w-3/4 border-[1px] sm:w-[190px]  py-2 rounded-[9999px] "
                  onClick={() => loginHandler(email, password)}
                >
                  Login
                </button>
              </div>
            </div> */

export default FormLogin;
