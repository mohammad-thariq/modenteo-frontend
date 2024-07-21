import React from "react";
import "../../styles/login.css";
import { Button } from "../../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { handleLogin } from "./hooks/login";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../common";

const Login = () => {
  const navigate = useNavigate();
  const schema = Yup.object({
    email: Yup.string()
      .email("Please Enter valid email")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const btnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleNavigate = (type) => {
    return navigate("/" + type);
  };
  return (
    <>
      <PageTitle title="Login" />
      <div className="login-wrapper">
        <div className="login-left">
          <div className="card-wrapper">
            <img
              src="/assets/images/logo3.png"
              alt="modenteologo"
              className="mb-4"
            />
            <p className="card-welcome">Welcome Back!!!</p>
            <p className="card-signin mb-4">Sign In</p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={schema}
              onSubmit={async (values, actions) => {
                await handleLogin({
                  email: values.email,
                  password: values.password,
                  type: "user",
                  // rememberMe: rememberMe,
                });
                actions.setSubmitting(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form>
                  <div className="login-form">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      // placeholder="Enter the Email"
                      value={values.email}
                    />
                  </div>
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {errors.email && touched.email && errors.email}
                  </p>
                  <div className="login-form">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // placeholder="Enter the Password"
                      name="password"
                      value={values.password}
                    />
                  </div>
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {errors.password && touched.password && errors.password}
                  </p>
                  <Button
                    onClick={handleSubmit}
                    isSubmitting={isSubmitting}
                    name="Sign In"
                    bg="#dc395f"
                    w="150px"
                    color="#fff"
                    type="submit"
                    style={btnStyle}
                  />
                </form>
              )}
            </Formik>
            <p className="singup-connect">
              Forgot Password? &nbsp;
              <span
                style={{ color: "#da627d", cursor: "pointer" }}
                onClick={() => handleNavigate("forgot-password")}
              >
                {" "}
                Reset
              </span>
            </p>
            <p className="singup-connect">
              I don’t have an account? &nbsp;
              <span
                style={{ color: "#da627d", cursor: "pointer" }}
                onClick={() => handleNavigate("register")}
              >
                {" "}
                Sign up
              </span>
            </p>
          </div>
        </div>
        <div className="login-right">
          <img src="/assets/svg/signin.svg" alt="sigin" />
        </div>
      </div>
    </>
  );
};

export default Login;