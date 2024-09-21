/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { refreshOutline, cartOutline } from "ionicons/icons";
import { Breadcrumb, Error, Loading, PageTitle } from "../../common";
import "../../styles/cart.css";
import { ManageBrandsApi, ManageCartApi } from "../../service";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { useQuery, useMutation } from "react-query";
import { PackageIcon } from "../../common/illustration/package";
import { MasterCardIcon } from "../../common/illustration/mastercard";
import { PaypalIcon } from "../../common/illustration/paypal";
import { VisaIcon } from "../../common/illustration/visa";
import { VappsIcon } from "../../common/illustration/vapps";
import { FakutraIcon } from "../../common/illustration/fakutra";
import { AmericanExpressIcon } from "../../common/illustration/americanExpress";
import Select from "react-select";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { productQuantitycustomStyles } from "../FilterPanel/style";

const { getCart, deleteCart, updateCart } = new ManageCartApi();
const { getBrands } = new ManageBrandsApi();

const fetchCart = (userID) => () => getCart(userID);
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [defaultQuantity, setDefaultQuantity] = useState(1);
  const userDetails = LocalStorageHelper.getItem(localStorageConst.USER);

  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("cart", fetchCart(userDetails?.id), {
    enabled: !!userDetails,
  });

  const { data: brands } = useQuery("brands", getBrands);

  useEffect(() => {
    if (userDetails) {
      if (cartData?.data && Array.isArray(cartData?.data)) {
        setCartItems(cartData?.data);
        // setTotalItems(userDetails?.quantity)
      }
    } else {
      // Handle guest cart items
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      setCartItems(guestCart);
    }
  }, [cartData, userDetails]);

  const quantityOption = useCallback((totalItems) => {
    if (totalItems > 0) {
      const generatedOptions = Array.from(
        { length: totalItems },
        (_, index) => ({
          value: index + 1,
          label: (index + 1).toString(),
        })
      );
      return generatedOptions;
    }
  }, []);

  const getBrandById = (cartBrandId) => {
    const convertToNumber = Number(cartBrandId);
    if (cartBrandId) {
      const getbrand = brands?.brands?.find((elem) => elem?.id === convertToNumber);
      return getbrand ? getbrand.name : undefined;
    }
    return undefined;
  };


  const { mutate: removeCart } = useMutation(deleteCart, {
    onSuccess: () => {
      ToastifySuccess("Product Removed from the cart");
      refetch();
      window.location.reload();

    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const { mutate: cartUpdate } = useMutation(updateCart, {
    onSuccess: () => {
      ToastifySuccess("Quantity Updated");
      refetch();
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const handleCart = (cartitem, qty) => {
    if (userDetails) {
      cartUpdate({ id: cartitem.id, quantity: qty });
    } else {
      // Update guest cart in local storage
      const guestCart = LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      console.log(guestCart, qty);
      const updatedCart = guestCart.map((item) => item.product_id === cartitem.product_id ? { ...item, quantity: qty } : item);
      // console.log(updatedCart,'updatedCart');

      LocalStorageHelper.setItem(localStorageConst.GUEST_CART, updatedCart);
      setCartItems(updatedCart); // Update local state
    }
  };

  const handleRemove = (cartitem) => {
    if (userDetails) {
      removeCart(cartitem.id);
    } else {
      // Remove from guest cart in local storage
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      console.log(cartitem.product_id, guestCart, 'guestCartguestCart')
      const updatedCart = guestCart.filter((item) => item.product_id !== cartitem.product_id);
      LocalStorageHelper.setItem(localStorageConst.GUEST_CART, updatedCart);
      setCartItems(updatedCart); // Update local state
      window.location.reload();
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total +
          (item.offer_price !== 0 ? item.offer_price : item.price) *
          defaultQuantity,
        0
      )
      .toFixed(2);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error.message} onRetry={refetch} />;
  }


  return (
    <>
      <PageTitle title={`Shopping Cart (${cartItems?.length} item)`} />
      <div className="page-content">
        <Breadcrumb />
        <div className="cart">
          <div className="container">
            {cartItems.length > 0 ? (
              <>
                <div className="pageTitle">
                  <h1>{`Shopping Cart (${cartItems?.length} item)`}</h1>
                  <div className="subText">
                    <PackageIcon />
                    <p>The package is delivered by Modenteo</p>
                  </div>
                </div>
                <div className="item-wrapper">
                  <div className="item-wrapper-flex">
                    {cartItems.map((item) => (
                      <div className="item" key={item.id}>
                        <Link to={"/product/" + item?.slug}>
                          <img src={item.image} alt={item.name} />
                        </Link>
                        <div className="item-details">
                          <div className="item-details-flex">
                            <div>
                              <div className="item-title mb-1">
                                {getBrandById(item?.brand_id)}
                              </div>
                              <Link to={"/product/" + item?.slug}>
                                <div className="mb-1">{item.name}</div>
                              </Link>
                              <div className="item-title mb-1">
                                Colour: {item?.color}{" "}
                              </div>
                              <div className="item-title mb-1">
                                Size: {item?.size}{" "}
                              </div>
                            </div>
                            <Select
                              options={quantityOption(item.quantity)}
                              isSearchable={false}
                              placeholder="1"
                              // value={defaultQuantity}
                              // onChange={(e) => handleCart(item, e?.target?.value)}
                              styles={productQuantitycustomStyles}
                              theme={(theme) => ({
                                ...theme,
                                colors: {
                                  ...theme.colors,
                                  primary25: "black",
                                  primary: "black",
                                },
                              })}
                            />
                          </div>
                          <div className="item-price-wrapper">
                            <div
                              className="item-price-wrapper-flex"
                              onClick={() => handleRemove(item)}
                            >
                              <img
                                src="/assets/icons/delete.png"
                                alt="remove item"
                              />
                              <p>Remove Item</p>
                            </div>
                            <div
                              className={
                                item.offer_price !== 0
                                  ? "item-offerPrice"
                                  : "item-price"
                              }
                            >
                              NOK{" "}
                              {item.offer_price !== 0
                                ? item.offer_price
                                : item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="summary">
                    <div>
                      <div className="summary-inner">
                        <span className="summary-text">Intermediate sum</span>{" "}
                        <span className="summary-text">
                          NOK {calculateTotal()}
                        </span>
                      </div>
                      <div className="summary-inner">
                        <span className="summary-text">Freight</span>{" "}
                        <span className="summary-text">NOK 0.00 </span>
                      </div>
                      <div className="summary-border" />
                      <div className="summary-inner">
                        <span className="summary-total">
                          Total sum
                          <span className="summary-total-description">
                            &nbsp;incl. 25% VAT.
                          </span>
                        </span>{" "}
                        <span className="summary-total">
                          NOK {calculateTotal()}
                        </span>
                      </div>
                      <a href="/" className="checkout">
                        To Checkout
                      </a>
                      <p className="payment-accept">We accept</p>
                      <div className="payment-methods">
                        <MasterCardIcon />
                        <PaypalIcon />
                        <VisaIcon />
                        <VappsIcon />
                        <FakutraIcon />
                        <AmericanExpressIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <IonIcon icon={cartOutline} size="large" />
                <p>No items in the cart</p>
                <Link
                  to="/"
                  className="continue-shopping btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUE SHOPPING</span>&nbsp;&nbsp;
                  <IonIcon icon={refreshOutline} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
