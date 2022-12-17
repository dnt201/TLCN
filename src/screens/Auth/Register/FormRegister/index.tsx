import React from "react";

import { Formik, Form, FastField } from "formik";
import userApi, { userApiAuth } from "@api/userApi";
import * as Yup from "yup";
import { CheckCircle, XCircle } from "@icons/index";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "@redux/userSlice";
import { AppDispatch, RootState } from "src/app/store";
import ClipLoader from "react-spinners/ClipLoader";
interface RegisterValues {
  email: string;
  password: string;
  confirmPassWord: string;
}
interface iFormRegisterProps {
  pause: boolean;
  setStep: (step: number) => void;
}
const FormRegister: React.FC<iFormRegisterProps> = (props) => {
  const { pause, setStep } = props;
  const { loading } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  const initialValues: RegisterValues = {
    email: "",
    password: "",
    confirmPassWord: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email sai định dạng")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(8, "Mật khẩu phải dài hơn 8 ký tự")
      .required("Vui lòng nhập mật khẩu")
      .matches(
        /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
        "Mật khẩu cần ít nhất 1 ký tự đặc biệt"
      )
      .matches(/[A-Z]/, "Mật khẩu cần ít nhất 1 chữ hoa")
      .matches(/[a-z]/, "Mật khẩu cần ít nhất 1 chữ thường"),
    confirmPassWord: Yup.string()
      .required("Vui lòng xác nhận mật khẩu của bạn")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const handleSubmit = async (values: RegisterValues, props: any) => {
    let user: userApiAuth = {
      email: values.email,
      password: values.password,
    };
    const result = await dispatch(userRegister(user));
    if (result.payload.error === undefined || result.payload.error === null) {
      setStep(2);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, props) => await handleSubmit(values, props)}
    >
      {({ values, errors, touched, setFieldError, resetForm, ...props }) => (
        <Form className="mt-4 flex flex-col pb-4" autoComplete="off">
          <div className="flex flex-col mb-2 mt-6 w-[280px]">
            <FastField
              autoComplete="off"
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
          <div className="flex flex-col mb-2  w-[280px]">
            <FastField
              autoComplete="off"
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
          <div className="flex flex-col mb-3  w-[280px]">
            <FastField
              className={
                "p-2  border-bg   rounded-md text-bg  border-[1px] text-sm   " +
                (!errors.confirmPassWord && values.confirmPassWord.length > 0
                  ? " border-yes text-yes "
                  : touched.confirmPassWord && errors.confirmPassWord
                  ? " border-no text-no placeholder:text-no   "
                  : "")
              }
              type="password"
              name="confirmPassWord"
              placeholder="Xác nhận mật khẩu của bạn"
            />
            {touched.confirmPassWord && errors.confirmPassWord ? (
              <i className="ml-1 mt-[1px] text-no text-xs flex items-center ">
                <XCircle className="text-no w-4 h-4 mr-[1px]" />
                {errors.confirmPassWord}
              </i>
            ) : (
              values.confirmPassWord.length > 0 &&
              !errors.confirmPassWord && (
                <i className="ml-1 mt-[1px] text-yes text-xs flex items-center ">
                  <CheckCircle className="text-yes w-4 h-4 mr-[1px]" /> Verify
                </i>
              )
            )}
          </div>

          <button
            className={
              "flex  bg-primary rounded-md  justify-center items-center p-2 " +
              (pause ||
              !props.isValid ||
              values.email.length <= 0 ||
              values.password.length <= 0 ||
              values.confirmPassWord.length <= 0
                ? " cursor-not-allowed bg-smokeDark"
                : null)
            }
            disabled={
              pause ||
              !props.isValid ||
              values.email.length <= 0 ||
              values.password.length <= 0 ||
              values.confirmPassWord.length <= 0
            }
            type="submit"
          >
            <span className="  font-medium text-sm text-center py-1 text-white mr-2">
              Register
            </span>
            <ClipLoader
              color={"#fff"}
              loading={loading}
              // cssOverride={override}
              size={16}
              className=" text-sm "
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormRegister;
