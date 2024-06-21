import React, { useEffect, useState } from "react";
import "../../styles/address.css";
import { Button } from "../../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { AddressApi } from "../../service";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { useMutation } from "react-query";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Radio,
} from "@mui/material";

const Address = ({
  setSelectedBillingAddress,
  setSelectedShippingAddress,
  selectedBillingAddress,
  selectedShippingAddress,
}) => {
  let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const { address, addressCreate, updateAddress } = new AddressApi();
  const [addressList, setaddressList] = useState([]);

  const [currentAddress, setCurrentAddress] = useState(null);
  const [type, setType] = useState("delivery_address");
  const { mutate: getAddress } = useMutation(address, {
    onSuccess: (data) => {
      setaddressList(data?.user_address);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    getAddress({ user_id: userDetails?.id });
  }, [getAddress, userDetails?.id]);

  const openModal = (type, address = null) => {
    setType(type);
    setCurrentAddress(address);
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.getElementById("billingModal").style.display = "block";
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.getElementById("billingModal").style.display = "none";
    setCurrentAddress(null); // Clear the current address being edited
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
    const deliveryAddress = {
      ...data,
      type: "delivery_address"
    }
    const res = currentAddress
      ? await updateAddress({ ...data, id: currentAddress.id })
      : await addressCreate(deliveryAddress);

    if (res?.code === "ERR_NETWORK") {
      ToastifyFailed(`${res?.message}`);
      return res;
    } else if (res?.response?.data?.error) {
      ToastifyFailed(`${res?.response?.data?.error}`);
      return res;
    } else {
      ToastifySuccess(
        `Address ${currentAddress ? "updated" : "added"} successfully`
      );
      getAddress({ user_id: userDetails?.id });
      closeModal();
    }
  };

  //   const { mutate: removeAddress } = useMutation(deleteAddress, {
  //     onSuccess: () => {
  //       ToastifySuccess("Address deleted");
  //       getAddress({ user_id: userDetails?.id });
  //     },
  //     onError: (error) => {
  //       ToastifyFailed(error?.message);
  //     },
  //   });

  //   const onEdit = (item) => {
  //     openModal("", item);
  //   };

  //   const onDelete = (item) => {
  //     removeAddress(item);
  //   };

  return (
    <div>
      <div className="billing-details">
        <h4>Billing Details</h4>
        <button
          onClick={() => openModal('billing_address')}
          className="billing-add-address-button"
        >
          + Add New Address
        </button>
      </div>
      {addressList.map(
        (item, key) =>
          item?.type === "delivery_address" && (
            <Card
              className="address-card"
              key={key}
              style={{ marginBottom: "16px" }}
            >
              <CardContent>
                <Typography variant="h6">{item?.fullName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item?.streetAddress}, {item?.city},{item?.state}{" "}
                  {item?.zipCode},{item?.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Contact - {item?.phoneNumber}
                </Typography>
              </CardContent>
              <CardActions>
                <Radio
                  checked={selectedBillingAddress === item.id}
                  onChange={() => setSelectedBillingAddress(item.id)}
                  value={item.id}
                  name="billingAddress"
                  inputProps={{ "aria-label": item.fullName }}
                />
                {/* <IconButton aria-label="edit" onClick={() => onEdit(item)}>
                            <IonIcon icon={pencilSharp} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => onDelete(item?.id)}>
                            <IonIcon icon={trashSharp} />
                        </IconButton> */}
              </CardActions>
            </Card>
          )
      )}

      <div className="shipping-details">
        <h4>Shipping Details</h4>
        <button
          onClick={() => openModal("shipping_address")}
          className="billing-add-address-button"
        >
          + Add New Address
        </button>
      </div>
      {addressList.map(
        (item, key) =>
          item?.type === "shipping_address" && (
            <Card
              className="address-card"
              key={key}
              style={{ marginBottom: "16px" }}
            >
              <CardContent>
                <Typography variant="h6">{item?.fullName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item?.streetAddress}, {item?.city},{item?.state}{" "}
                  {item?.zipCode},{item?.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Contact - {item?.phoneNumber}
                </Typography>
              </CardContent>
              <CardActions>
                <Radio
                  checked={selectedShippingAddress === item.id}
                  onChange={() => setSelectedShippingAddress(item.id)}
                  value={item.id}
                  name="shippingAddress"
                  inputProps={{ "aria-label": item.fullName }}
                />
                {/* <IconButton aria-label="edit" onClick={() => onEdit(item)}>
                            <IonIcon icon={pencilSharp} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => onDelete(item?.id)}>
                            <IonIcon icon={trashSharp} />
                        </IconButton> */}
              </CardActions>
            </Card>
          )
      )}

      <div id="billingModal" className="billing-modal">
        <div className="billing-modal-content">
          <span className="billing-close" onClick={closeModal}>
            &times;
          </span>
          <h4>{currentAddress ? "Edit Address" : "Add Address"}</h4>
          <Formik
            initialValues={{
              fullName: currentAddress?.fullName || "",
              streetAddress: currentAddress?.streetAddress || "",
              state: currentAddress?.state || "",
              city: currentAddress?.city || "",
              zipCode: currentAddress?.zipCode || "",
              country: currentAddress?.country || "",
              phoneNumber: currentAddress?.phoneNumber || "",
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
                type: type,
                is_enable: 0,
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
              <form onSubmit={handleSubmit}>
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
                    {errors.fullName && touched.fullName && errors.fullName}
                  </p>
                </div>
                <div className="flex align-items-center gap-rem justify-content-sb">
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
                </div>
                <div className="flex align-items-center gap-rem justify-content-sb">
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
                      {errors.state && touched.state && errors.state}
                    </p>
                  </div>
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
                      {errors.city && touched.city && errors.city}
                    </p>
                  </div>
                </div>
                <div className="flex align-items-center gap-rem justify-content-sb">
                  <div>
                    <div className="billing-form">
                      <label>Zip Code</label>
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
                      {errors.zipCode && touched.zipCode && errors.zipCode}
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
                      {errors.country && touched.country && errors.country}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  isSubmitting={isSubmitting}
                  name="Submit"
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
