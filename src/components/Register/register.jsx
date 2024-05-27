import React from "react";
import "../../styles/register.css";
import { Button } from "../../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { handleRegister } from "./hooks/register";
import { useNavigate } from "react-router-dom";


const Registration = () => {
  const navigate = useNavigate();

  const schema = Yup.object({
    first_name: Yup.string().required("Field is Required"),
    last_name: Yup.string().required("Field is Required"),
    email: Yup.string()
      .email("Please Enter valid email")
      .required("Field is Required"),
    password: Yup.string().required("Field is Required"),
  });

  const btnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleNavigate = () => {
    return navigate("/login");
  };
  return (
    <div className="register-wrapper">
      <div className="register-right">
        <img src="/assets/svg/signin.svg" alt="sigin" />
      </div>
      <div className="register-left">
        <div className="card-wrapper">
          <img
            src="/assets/images/logo3.png"
            alt="modenteologo"
            className="mb-4"
          />
          <p className="card-signin mb-4">Sign Up</p>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              await handleRegister({
                first_name: values.first_name,
                last_name: values.last_name,
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
                <div className="input-register flex align-items-center gap-rem justify-content-sb mb-2">
                  <div>
                    <div className="register-form">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="first_name"
                        // placeholder="Enter the Email"
                        value={values.first_name}
                      />
                    </div>
                    <p className="errorMessage">
                      {errors.first_name &&
                        touched.first_name &&
                        errors.first_name}
                    </p>
                  </div>
                  <div>
                    <div className="register-form">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="last_name"
                        // placeholder="Enter the Email"
                        value={values.last_name}
                      />
                    </div>
                    <p className="errorMessage">
                      {errors.last_name &&
                        touched.last_name &&
                        errors.last_name}
                    </p>
                  </div>
                </div>
                <div className="register-form">
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
                <p className="errorMessage">
                  {errors.email && touched.email && errors.email}
                </p>
                <div className="input-register flex align-items-center gap-rem justify-content-sb mb-2">
                  <div>
                    <div className="register-form">
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
                    <p className="errorMessage">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <div>
                    <div className="register-form">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        value={values.password}
                      />
                    </div>
                    <p className="errorMessage">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  isSubmitting={isSubmitting}
                  name="Sign Up"
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
            Already have a account? &nbsp;
            <span style={{ color: "#da627d", cursor: "pointer" }} onClick={() => handleNavigate()}>
              {" "}
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
