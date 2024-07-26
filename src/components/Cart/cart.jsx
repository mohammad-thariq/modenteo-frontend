import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  refreshOutline,
  cartOutline,
} from "ionicons/icons";
import { Breadcrumb, Error, Loading, PageTitle } from "../../common";
import "../../styles/cart.css";
import { ManageCartApi } from "../../service";
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

const { getCart, deleteCart, updateCart } = new ManageCartApi();
// const { getBrandById } = new ManageBrandsApi();

const fetchCart = (userID) => () => getCart(userID);
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [totalItems, setTotalItems] = useState(10);
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

  useEffect(() => {
    if (userDetails) {
      // setTotalItems(userDetails?.quantity)
      if (cartData?.data && Array.isArray(cartData?.data)) {
        setCartItems(cartData?.data);
      }
    } else {
      // Handle guest cart items
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      setCartItems(guestCart);
    }
  }, [cartData, userDetails]);

  useEffect(() => {
    if (totalItems > 0) {
      const generatedOptions = Array.from(
        { length: totalItems },
        (_, index) => ({
          value: index + 1,
          label: (index + 1).toString(),
        })
      );
      setOptions(generatedOptions);
    }
  }, [totalItems]);

  const { mutate: removeCart } = useMutation(deleteCart, {
    onSuccess: () => {
      ToastifySuccess("Product Removed from the cart");
      refetch();
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

  const handleCart = (id, qty) => {
    if (userDetails) {
      cartUpdate({ id: id, quantity: qty });
    } else {
      // Update guest cart in local storage
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      const updatedCart = guestCart.map((item) =>
        item.product_id === id ? { ...item, quantity: qty } : item
      );
      LocalStorageHelper.setItem(localStorageConst.GUEST_CART, updatedCart);
      setCartItems(updatedCart); // Update local state
    }
  };

  const handleRemove = (id) => {
    if (userDetails) {
      removeCart(id);
    } else {
      // Remove from guest cart in local storage
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      const updatedCart = guestCart.filter((item) => item.product_id !== id);
      LocalStorageHelper.setItem(localStorageConst.GUEST_CART, updatedCart);
      setCartItems(updatedCart); // Update local state
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total +
          (item.offer_price <= 0 ? item.price : item.offer_price) *
            item.quantity,
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

  console.log(cartData, "cartData");
  return (
    <>
      <PageTitle title={`Shopping Cart (${cartData?.data?.length} item)`} />
      <div className="page-content">
        <Breadcrumb />
        <div className="cart">
          <div className="container">
            {cartItems.length > 0 ? (
              <>
                <div className="pageTitle">
                  <h1>{`Shopping Cart (${cartData?.data?.length} item)`}</h1>
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
                              {/* <div className="item-title mb-1">All Saints</div> */}
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
                              options={options}
                              value={item.quantity}
                              isSearchable={false}
                            />
                          </div>
                          <div className="item-price-wrapper">
                            <div
                              className="item-price-wrapper-flex"
                              onClick={() => handleRemove(item.id)}
                            >
                              <img
                                src="/assets/icons/delete.png"
                                alt="remove item"
                              />
                              <p>Remove Item</p>
                            </div>
                            <div className="item-price">
                              NOK{" "}
                              {item.offer_price <= 0
                                ? item.price
                                : item.offer_price}
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
          {/* <div className={cartItems.length > 0 ? "col-lg-9" : "col-lg-12"}>
                {cartItems.length > 0 ? (
                  <>
                    <table className="table table-cart table-mobile">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <Link to={"/product/" + item?.slug}>
                                    <img src={item.image} alt="Product" />
                                  </Link>
                                </figure>
                                <h3 className="product-title">
                                  <Link to={"/product/" + item?.slug}>
                                    {item.name}
                                  </Link>
                                </h3>
                              </div>
                            </td>
                            <td className="price-col">
                              $
                              {item.offer_price <= 0
                                ? item.price
                                : item.offer_price}
                            </td>
                            <td className="quantity-col">
                              <div className="cart-product-quantity">
                                <div className="input-group input-spinner">
                                  <div className="input-group-prepend">
                                    <button
                                      style={{ minWidth: 26 }}
                                      className="btn btn-decrement btn-spinner"
                                      type="button"
                                      onClick={() =>
                                        handleCart(item?.id, item?.quantity - 1)
                                      }
                                    >
                                      <IonIcon icon={removeOutline} />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    style={{ textAlign: "center" }}
                                    className="form-control"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleCart(item?.id, e.target.value)
                                    }
                                  />
                                  <div className="input-group-append">
                                    <button
                                      style={{ minWidth: 26 }}
                                      className="btn btn-increment btn-spinner"
                                      type="button"
                                      onClick={() =>
                                        handleCart(item?.id, item?.quantity + 1)
                                      }
                                    >
                                      <IonIcon icon={addOutline} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="total-col">
                              $
                              {(item.offer_price <= 0
                                ? item.price
                                : item.offer_price * item.quantity
                              ).toFixed(2)}
                            </td>
                            <td className="remove-col">
                              <button
                                className="btn-remove"
                                onClick={() => handleRemove(item.id)}
                              >
                                <IonIcon icon={closeOutline} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="empty-cart">
                    <IonIcon icon={cartOutline} size="large" />
                    <p>No items in the cart</p>
                    <Link
                      to="/"
                      className="continue-shopping btn btn-outline-dark-2 btn-block mb-3"
                    >
                      <span>CONTINUE SHOPPING</span>
                      <IonIcon icon={refreshOutline} />
                    </Link>
                  </div>
                )}
              </div>
              {cartItems.length > 0 && (
                <aside className="col-lg-3">
                  <div className="summary summary-cart">
                    <h3 className="summary-title">Cart Total</h3>
                    <table className="table table-summary">
                      <tbody>
                        <tr className="summary-subtotal">
                          <td>Subtotal:</td>
                          <td>${calculateTotal()}</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total:</td>
                          <td>${calculateTotal()}</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link
                      to="/checkout"
                      className="btn btn-outline-primary-2 btn-order btn-block"
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                  <Link
                    to="/"
                    className="btn btn-outline-dark-2 btn-block mb-3"
                  >
                    <span>CONTINUE SHOPPING</span>
                    <IonIcon icon={refreshOutline} />
                  </Link>
                </aside>
              )} */}
        </div>
      </div>
    </>
  );
};

export default Cart;
