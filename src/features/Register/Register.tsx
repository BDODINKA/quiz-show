import React from "react";
import { useAppDispatch } from "../../app/bll/store";
import * as Yup from "yup";

export const Register = () => {
  const dispatch = useAppDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div>test</div>
    /*<Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
            dispatch(registerTC(values));
          }}
        >
          <Form>
            <h2>Sing Up</h2>
            <label htmlFor="email">Email</label>
            <SuperInput name="email" type="email" />
            <ErrorMessage name="email" />
    
            <label htmlFor="password">Password</label>
            <SuperInput name="password" type="password" />
            <label htmlFor="Confirm password">Confirm password</label>
            <SuperInput name="Confirm password" type="password" />
            <SuperButton type="submit">Submit</SuperButton>
            <div>
              <p>Already have an account?</p>
              <a href="#">Sign In</a>
            </div>
          </Form>
        </Formik>*/
  );
};
