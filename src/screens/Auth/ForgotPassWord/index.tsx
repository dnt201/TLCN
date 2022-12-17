import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ChangePassWord, ChevronLeft } from "@icons/index";
import img from "@images/forgot-password.gif";
import { Formik, Form, Field, FastField } from "formik";
import { BarLoader, ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import userApi from "@api/userApi";
import { toast } from "react-hot-toast";
import { CheckCircle, Seen, SeenFill, XCircle } from "@icons/index";

interface FormValuesStep1 {
  email: string;
}
interface FormValuesStep3 {
  newPassword: string;
  confirmPassWord: string;
}
interface iProps {}
const ForgotPassWord: React.FC<iProps> = (props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [curGmail, setCurGmail] = useState("");
  const [curToken, setCurToken] = useState("");

  //#region
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) navigate("/");
  }, []);
  //#endregion

  // Start Step 1
  const initialValues: FormValuesStep1 = { email: curGmail };
  const captchaRef = useRef(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email sai định dạng")
      .required("Vui lòng nhập email"),
  });

  // End Step 1

  //Step 3
  const [isVisible, setVisible] = useState(false);

  const initialValuesStep3: FormValuesStep3 = {
    newPassword: "",
    confirmPassWord: "",
  };
  const validationSchemaStep3 = Yup.object().shape({
    newPassword: Yup.string()
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
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });
  //Step 3

  return (
    <div className="flex h-screen ">
      {/* Start Step 1: Enter Email */}
      <div className="flex-1 flex flex-col justify-center items-center ">
        <div className="flex flex-col items-center text-bg justify-center  max-w-[480px] ">
          <h1 className="flex items-center gap-2">
            Password Recover <ChangePassWord className="w-8 h-8 mt-[2px]" />
          </h1>
          <p className="text-center text-sm mt-2">
            {step === 1 ? (
              `Enter the email address of the account you're having trouble
            accessing, and we'll send you token to reset your password`
            ) : step === 2 ? (
              <div className="flex flex-col text-left gap-2">
                <span>Check your email.</span>
                <span className="font-extralight">
                  We just sent instructions for completing your password reset
                  to the email you used to set up your TeachingMe Account.
                </span>
                <span className="font-extralight">
                  If you don't see it in your inbox within the next few minutes,
                  try looking in your spam folder.
                </span>
              </div>
            ) : null}
          </p>
          {loading ? (
            <div className="mt-10">
              <BarLoader color="#000" />
            </div>
          ) : step === 1 ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (value) => {
                setCurGmail(value.email);
                setLoading(true);
                const rs = await userApi.forgotPassword(value.email);
                setTimeout(() => {
                  if (rs.status === 201) {
                    setStep(2);
                  } else {
                    toast.error(rs.data.message || "Forgot password lỗi!");
                  }

                  setLoading(false);
                }, 500);
              }}
            >
              {({
                values,
                errors,
                touched,
                setFieldError,
                resetForm,
                ...props
              }) => (
                <Form className="mt-4 w-full flex flex-col pb-4">
                  <div className="flex flex-col mb-2 mt-6 ">
                    <FastField
                      className={
                        "p-2   border-bg   rounded-md text-bg  border-[1px] text-sm   " +
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
                          <CheckCircle className="text-yes w-4 h-4 mr-[1px]" />{" "}
                          Verify
                        </i>
                      )
                    )}
                  </div>

                  <div className="flex flex-row-reverse ">
                    <button
                      className={
                        "relative bg-primary text-white rounded-md flex-[2] ml-2 flex items-center disabled:bg-primaryHover " +
                        (!props.isValid ||
                        values.email.length <= 0 ||
                        values.email.length <= 0
                          ? " cursor-not-allowed"
                          : null)
                      }
                      disabled={
                        !props.isValid ||
                        values.email.length <= 0 ||
                        values.email.length <= 0
                      }
                      type="submit"
                    >
                      <span className="flex-1 text-center">Send</span>
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
                        // setStep(1);
                        navigate(-1);
                      }}
                    >
                      <ChevronLeft className="w-5 h-5 absolute left-1 top-1/2 -translate-y-1/2" />
                      Back
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : step === 2 ? (
            <div className="w-full mt-4">
              <input
                value={curToken}
                onChange={(e) => setCurToken(e.target.value)}
                className="p-2 w-full border-gray   text-bg  border-b-[1px] focus:border-bg text-sm focus:outline-none   "
                placeholder="Nhập token!"
              />
              <button
                className={
                  "w-full py-2 mt-1 " +
                  (curToken.length > 0
                    ? " bg-primary "
                    : " bg-primaryHover cursor-not-allowed ")
                }
                disabled={curToken.length <= 0}
                onClick={async () => {
                  setLoading(true);
                  const rs = await userApi.verifyForgotPassWordToken(curToken);
                  setTimeout(() => {
                    if (rs.status === 201) {
                      toast.success(
                        "Xác thực token thành công! Thay đổi mật khẩu của bạn!"
                      );
                      setStep(3);
                    } else {
                      toast.error(rs.data.message || "Token Lỗi");
                    }
                    setLoading(false);
                  }, 1000);
                }}
              >
                Verify
              </button>
            </div>
          ) : step === 3 ? (
            <div className="w-full mt-4 flex-col flex ">
              <b className="flex  items-center">
                Reset Your Password
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
              </b>
              <span className="font-extralight text-left">
                Please enter your new password below.
              </span>
              <Formik
                initialValues={initialValuesStep3}
                validationSchema={validationSchemaStep3}
                onSubmit={async (value) => {
                  setLoading(true);

                  const rs = await userApi.changePasswordWithToken(
                    curToken,
                    value.newPassword,
                    value.confirmPassWord
                  );
                  setTimeout(() => {
                    if (rs.status === 201) {
                      toast.success(
                        "Đổi password thành công! Đăng nhập với password mới!"
                      );
                      navigate("/login");
                    } else
                      toast.error(
                        rs.data.message ||
                          "Không thể thay đổi password. Ấn F5 để thử lại!"
                      );
                    setLoading(false);
                  }, 1000);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldError,
                  resetForm,
                  ...props
                }) => (
                  <Form className="mt-4 w-full flex flex-col pb-4">
                    <div className="flex flex-col mb-2  w-full">
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
                            <CheckCircle className="text-yes w-4 h-4 mr-[1px]" />{" "}
                            Verify
                          </i>
                        )
                      )}
                    </div>
                    <div className="flex flex-col mb-3  w-full">
                      <Field
                        className={
                          "p-2  border-bg   rounded-md text-bg  border-[1px] text-sm   " +
                          (!errors.confirmPassWord &&
                          values.confirmPassWord.length > 0
                            ? " border-yes text-yes "
                            : touched.confirmPassWord && errors.confirmPassWord
                            ? " border-no text-no placeholder:text-no   "
                            : "")
                        }
                        type={isVisible ? "text" : "password"}
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
                            <CheckCircle className="text-yes w-4 h-4 mr-[1px]" />{" "}
                            Verify
                          </i>
                        )
                      )}
                    </div>

                    <div className="flex flex-row-reverse ">
                      <button
                        className={
                          "relative w-full bg-primary text-white rounded-md flex-[2]  py-2 flex items-center disabled:bg-primaryHover " +
                          (!props.isValid ||
                          values.newPassword.length <= 0 ||
                          values.newPassword.length <= 0
                            ? " cursor-not-allowed"
                            : null)
                        }
                        disabled={
                          !props.isValid ||
                          values.newPassword.length <= 0 ||
                          values.newPassword.length <= 0
                        }
                        type="submit"
                      >
                        <span className="flex-1 text-center">Change</span>
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
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <img className="h-[75vh] mr-8 " src={img} />
      </div>
    </div>
  );
};

export default ForgotPassWord;
