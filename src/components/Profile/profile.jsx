import React from "react";
import { Button } from "../../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";

const Profile = () => {
    const schema = Yup.object({
        first_name: Yup.string().required("Field is Required"),
        last_name: Yup.string().required("Field is Required"),
        email: Yup.string()
            .email("Please Enter valid email")
            .required("Field is Required"),
    });

    const btnStyle = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    };
    return (
        <div className="content-wrapper">
            <div className="row">

                <Formik
                    initialValues={{
                        first_name: "",
                        last_name: "",
                        email: "",
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        //   await handleRegister({
                        //     first_name: values.first_name,
                        //     last_name: values.last_name,
                        //     email: values.email,
                        //     type: "user",
                        //     // rememberMe: rememberMe,
                        //   });
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

                            <div className="register-form">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="first_name"
                                    value={values.first_name}
                                />
                            </div>
                            <p className="errorMessage">
                                {errors.first_name &&
                                    touched.first_name &&
                                    errors.first_name}
                            </p>
                            <div className="register-form">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="last_name"
                                    value={values.last_name}
                                />
                            </div>
                            <p className="errorMessage">
                                {errors.last_name &&
                                    touched.last_name &&
                                    errors.last_name}
                            </p>
                            <div className="register-form">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    value={values.email}
                                />
                            </div>
                            <p className="errorMessage">
                                {errors.email && touched.email && errors.email}
                            </p>
                            <Button
                                onClick={handleSubmit}
                                isSubmitting={isSubmitting}
                                name="Update"
                                bg="#dc395f"
                                w="150px"
                                color="#fff"
                                type="submit"
                                style={btnStyle}
                            />
                        </form>
                    )}
                </Formik>

            </div>
        </div>
    );
};

export default Profile;
