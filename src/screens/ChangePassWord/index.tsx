import { AppDispatch } from "@app/store";
import { userGetMe } from "@redux/userSlice";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CheckCircle, Seen, SeenFill, XCircle } from "@icons/index";
import userApi from "@api/userApi";
import toast from "react-hot-toast";

interface iFormChangePassword {}
export interface ChangePassWordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const ChangePassWord: React.FC<iFormChangePassword> = (props) => {
  const {} = props;
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  console.log("re render");

  const initialValues: ChangePassWordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Mật khẩu phải dài hơn 8 ký tự")
      .required("Vui lòng nhập mật khẩu cũ của bạn")
      .matches(
        /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
        "Mật khẩu cần ít nhất 1 ký tự đặc biệt"
      )
      .matches(/[A-Z]/, "Mật khẩu cần ít nhất 1 chữ hoa")
      .matches(/[a-z]/, "Mật khẩu cần ít nhất 1 chữ thường"),
    newPassword: Yup.string()
      .min(8, "Mật khẩu phải dài hơn 8 ký tự")
      .required("Vui lòng nhập mật khẩu")
      .matches(
        /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
        "Mật khẩu cần ít nhất 1 ký tự đặc biệt"
      )
      .matches(/[A-Z]/, "Mật khẩu cần ít nhất 1 chữ hoa")
      .matches(/[a-z]/, "Mật khẩu cần ít nhất 1 chữ thường"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập lại mật khẩu của bạn")
      .oneOf([Yup.ref("newPassword"), null], "Password không khớp!"),
  });

  const handleSubmit = async (values: ChangePassWordValues, props: any) => {
    console.log("aaaaa", props);
    setLoading(true);
    const toastId = toast.loading("Loading...");

    // ...
    const result = await userApi.updatePassword(values);
    if (result.status === 201) {
      toast.success("Change password success", {
        id: toastId,
        duration: 2500,
      });
      props.resetForm();
      setLoading(false);
    } else {
      toast.error(result.data.message, {
        id: toastId,
        duration: 2500,
      });
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  };

  return (
    <div className="h-[calc(100vh-52px)] w-full bg-bg flex flex-col items-center justify-start">
      <div className="flex justify-center items-center mt-20 mb-6">
        <h2>Change password</h2>
        <i
          className="ml-2 hover:cursor-pointer"
          onClick={() => {
            setVisible(!isVisible);
          }}
        >
          {isVisible ? (
            <SeenFill className="w-5 h-5 " />
          ) : (
            <Seen className="w-5 h-5 " />
          )}
        </i>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, props) => await handleSubmit(values, props)}
      >
        {({ values, errors, touched, setFieldError, resetForm, ...props }) => (
          <Form className=" flex flex-col pb-4" autoComplete="off">
            <div className="flex  flex-col mb-2 w-[280px]">
              <Field
                autoComplete="off"
                className={
                  "p-2  border-bg   rounded-md text-bg  border-[1px] text-sm   " +
                  (!errors.oldPassword && values.oldPassword.length > 0
                    ? " border-yes text-yes "
                    : touched.oldPassword && errors.oldPassword
                    ? " border-no text-no placeholder:text-no   "
                    : "")
                }
                type={isVisible ? "text" : "password"}
                name="oldPassword"
                placeholder="Nhập mật khẩu cũ"
              />

              {touched.oldPassword && errors.oldPassword ? (
                <i className="ml-1 mt-[1px] text-no text-xs flex items-center ">
                  <XCircle className="text-no w-4 h-4 mr-[1px]" />
                  {errors.oldPassword}
                </i>
              ) : (
                values.oldPassword.length > 0 &&
                !errors.oldPassword && (
                  <i className="ml-1 mt-[1px] text-yes text-xs flex items-center ">
                    <CheckCircle className="text-yes w-4 h-4 mr-[1px]" /> Verify
                  </i>
                )
              )}
            </div>
            <div className="flex flex-col mb-2  w-[280px]">
              <Field
                autoComplete="off"
                className={
                  "p-2 border-bg   rounded-md text-bg  border-[1px]  text-sm " +
                  (!errors.newPassword && values.newPassword.length > 0
                    ? " border-yes text-yes "
                    : touched.newPassword && errors.newPassword
                    ? " border-no text-no  placeholder:text-no "
                    : "")
                }
                name="newPassword"
                type={isVisible ? "text" : "password"}
                placeholder="Nhập mật khẩu mới của bạn"
              />

              {touched.newPassword && errors.newPassword ? (
                <i className="ml-1 mt-[1px] text-no text-xs flex items-center ">
                  <XCircle className="text-no w-4 h-4 mr-[1px]" />
                  {errors.newPassword}
                </i>
              ) : (
                values.newPassword.length > 0 &&
                !errors.newPassword && (
                  <i className="ml-1 mt-[1px] text-yes text-xs flex items-center ">
                    <CheckCircle className="text-yes w-4 h-4 mr-[1px]" /> Verify
                  </i>
                )
              )}
            </div>
            <div className="flex flex-col mb-3  w-[280px]">
              <Field
                className={
                  "p-2  border-bg   rounded-md text-bg  border-[1px] text-sm   " +
                  (!errors.confirmPassword && values.confirmPassword.length > 0
                    ? " border-yes text-yes "
                    : touched.confirmPassword && errors.confirmPassword
                    ? " border-no text-no placeholder:text-no   "
                    : "")
                }
                type={isVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu của bạn"
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <i className="ml-1 mt-[1px] text-no text-xs flex items-center ">
                  <XCircle className="text-no w-4 h-4 mr-[1px]" />
                  {errors.confirmPassword}
                </i>
              ) : (
                values.confirmPassword.length > 0 &&
                !errors.confirmPassword && (
                  <i className="ml-1 mt-[1px] text-yes text-xs flex items-center ">
                    <CheckCircle className="text-yes w-4 h-4 mr-[1px]" /> Verify
                  </i>
                )
              )}
            </div>

            <button
              className={
                "flex  bg-primary rounded-md  justify-center items-center " +
                (!props.isValid ||
                values.oldPassword.length <= 0 ||
                values.newPassword.length <= 0 ||
                values.confirmPassword.length <= 0 ||
                loading
                  ? " cursor-not-allowed bg-smokeDark"
                  : null)
              }
              disabled={
                !props.isValid ||
                values.oldPassword.length <= 0 ||
                values.newPassword.length <= 0 ||
                values.confirmPassword.length <= 0 ||
                loading
              }
              type="submit"
            >
              <span className="  font-medium text-sm text-center py-2 text-white mr-2">
                Change passwork
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassWord;
