import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CheckCircle, ChevronLeft, XCircle } from "@icons/index";
// import ReCAPTCHA from "react-google-recaptcha";
import { ReCAPTCHA } from "react-google-recaptcha";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FastField,
} from "formik";
import { ClipLoader } from "react-spinners";
import { isFulfilled } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
interface FormValues {
  email: string;
}
interface iProps {}
const ForgotPassWord: React.FC<iProps> = (props) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  //#region
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) navigate("/");
  }, []);
  //#endregion

  // Start Step 1
  const initialValues: FormValues = { email: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email sai định dạng")
      .required("Vui lòng nhập email"),
  });

  // End Step 1

  return (
    <div>
      {/* Start Step 1: Enter Email */}
      {step === 1 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => setStep(2)}
        >
          {({
            values,
            errors,
            touched,
            setFieldError,
            resetForm,
            ...props
          }) => (
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
                      <CheckCircle className="text-yes w-4 h-4 mr-[1px]" />{" "}
                      Verify
                    </i>
                  )
                )}
              </div>

              <ReCAPTCHA sitekey="6Lc0ZXYjAAAAAKIOleUSIjQ4bf2c6zu9DEPM-Jzx" />
              <div className="flex flex-row-reverse ">
                <button
                  className={
                    "relative bg-primary rounded-md flex-[2] ml-2 flex items-center " +
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
      ) : step === 2 ? (
        <div>step2</div>
      ) : step === 3 ? (
        <div>step3</div>
      ) : null}

      {/* End Step 1: Enter Email */}
    </div>
  );
};

export default ForgotPassWord;
