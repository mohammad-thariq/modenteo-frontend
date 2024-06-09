import React from 'react';
import '../../styles/address.css';
import { Button } from '../../common/Button';
import { Formik } from "formik";
import * as Yup from "yup";
import { LocalStorageHelper } from '../../utils/localStorage';
import { localStorageConst } from '../../constants/localStorage';
import { AddressApi } from '../../service';
import { ToastifyFailed, ToastifySuccess } from '../../common/Toastify';
import { Reload } from '../../helper/base';
const Address = () => {
    let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
    const { address } = new AddressApi();


    const openModal = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.getElementById('billingModal').style.display = 'block';
    };

    const closeModal = () => {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.getElementById('billingModal').style.display = 'none';
    };


    const schema = Yup.object({
        fullName: Yup.string().required("Field is Required"),
        streetAddress: Yup.string().required("Field is Required"),
        state: Yup.string().required("Field is Required"),
        city: Yup.string().required("Field is Required"),
        zipCode: Yup.string().required("Field is Required"),
        phoneNumber: Yup.string().required("Field is Required"),

    });

    const btnStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };



    const handleAddress = async (data) => {
        const res = await address(data);
        if (res?.code === "ERR_NETWORK") {
            ToastifyFailed(`${res?.message}`);
            return res;
        } else if (res?.response?.data?.error) {
            ToastifyFailed(`${res?.response?.data?.error}`);
            return res;
        } else {
            ToastifySuccess("Address added successfully");
            Reload()
        }
    };


    return (
        <div>
            <div className="billing-details">
                <h4>Delivery & Shipping Details</h4>
                <button onClick={openModal} className="billing-add-address-button">
                    + Add New Address
                </button>
            </div>

            <div id="billingModal" className="billing-modal">
                <div className="billing-modal-content">
                    <span className="billing-close" onClick={closeModal}>&times;</span>
                    <h4>Add Address</h4>
                    <Formik
                        initialValues={{
                            fullName: '',
                            streetAddress: '',
                            state: '',
                            city: '',
                            zipCode: '',
                            country: '',
                            phoneNumber: '',
                            type: '',
                        }}
                        validationSchema={schema}
                        onSubmit={async (values, actions) => {
                            await handleAddress({
                                user_id: userDetails?.id,
                                fullName: values.fullName,
                                streetAddress: values.streetAddress,
                                state: values.state,
                                city: values.city,
                                zipCode: values.zipCode,
                                country: values.country,
                                phoneNumber: values.phoneNumber,
                                type: "delivery_address",
                                is_enable: 0
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

                                <div>
                                    <div className="billing-form">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="fullName"
                                            value={values.fullName}
                                        />
                                    </div>
                                    <p className="errorMessage">
                                        {errors.fullName &&
                                            touched.fullName &&
                                            errors.fullName}
                                    </p>
                                </div>


                                <div className='flex align-items-center gap-rem justify-content-sb'>
                                    <div>
                                        <div className="billing-form">
                                            <label>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="streetAddress"
                                                value={values.streetAddress}
                                            />
                                        </div>
                                        <p className="errorMessage">
                                            {errors.streetAddress &&
                                                touched.streetAddress &&
                                                errors.streetAddress}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="billing-form">
                                            <label>State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="state"
                                                value={values.state}
                                            />
                                        </div>
                                        <p className="errorMessage">
                                            {errors.state &&
                                                touched.state &&
                                                errors.state}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex align-items-center gap-rem justify-content-sb'>
                                    <div>
                                        <div className="billing-form">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="city"
                                                value={values.city}
                                            />
                                        </div>
                                        <p className="errorMessage">
                                            {errors.city &&
                                                touched.city &&
                                                errors.city}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="billing-form">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="country"
                                                value={values.country}
                                            />
                                        </div>
                                        <p className="errorMessage">
                                            {errors.country &&
                                                touched.country &&
                                                errors.country}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex align-items-center gap-rem justify-content-sb'>
                                    <div>
                                        <div className="billing-form">
                                            <label>Zipcode</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="zipCode"
                                                value={values.zipCode}
                                            />
                                        </div>
                                        <p className="errorMessage">
                                            {errors.zipCode &&
                                                touched.zipCode &&
                                                errors.zipCode}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="billing-form">
                                            <label>Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                            />
                                        </div>
                                        <p className="errorMessage">
                                            {errors.phoneNumber &&
                                                touched.phoneNumber &&
                                                errors.phoneNumber}
                                        </p>
                                    </div>
                                </div>


                                <Button
                                    onClick={handleSubmit}
                                    isSubmitting={isSubmitting}
                                    name="Add Address"
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
        </div>
    );
};

export default Address;
