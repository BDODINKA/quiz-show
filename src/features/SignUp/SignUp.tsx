import React from "react";
import { useAppDispatch } from "../../app/store";
import * as Yup from "yup";
import { Formik } from "formik";
import SuperInput from "../../common/superInputText/SuperInput";
import { signUpTC } from "./sign-up-reducer";

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Your password is too short.")
      .matches(/[a-zA-Z0-9]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
        dispatch(signUpTC(values));
         //setSubmitting(false);
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <SuperInput
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <SuperInput
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password">Confirm password</label>
              <SuperInput
                id="confirmPassword"
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />

              <span className="error" style={{ color: "red" }}>
                {formik.errors.confirmPassword}
              </span>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
