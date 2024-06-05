import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { closeOutline, addOutline, removeOutline, refreshOutline, cartOutline } from "ionicons/icons";
import { Breadcrumb, Error, Loading } from "../../common";
import "../../styles/cart.css";
import { ManageCartApi } from "../../service";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { useQuery, useMutation } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
const { getCart, deleteCart, updateCart } = new ManageCartApi();
const fetchCart = (userID) => () => getCart(userID);

const Cart = () => {
  let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);

  const { data: cartData, isLoading, isError, error, refetch } = useQuery('cart', fetchCart(userDetails?.id));
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartData?.data && Array.isArray(cartData?.data)) {
      setCartItems(cartData?.data);
    }
  }, [cartData])

  const { mutate: removeCart } = useMutation(deleteCart, {
    onSuccess: (data) => {
      ToastifySuccess("Product Removed from the cart");
      refetch();

    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });
  const { mutate: cartUpdate } = useMutation(updateCart, {
    onSuccess: (data) => {
      ToastifySuccess("Quantity Updated");
      refetch();

    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });
  const handleCart = (id, qty) => {
    cartUpdate({ id: id, quantity: qty });
  };

  const handleRemove = (id) => {
    removeCart(id);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.offer_price <= 0 ? item.price : item.offer_price) * item.quantity, 0).toFixed(2);
  };
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error.message} onRetry={refetch} />
  }
  return (
    <div className="page-content">
      <Breadcrumb />
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className={cartItems.length > 0 ? "col-lg-9" : "col-lg-12"}>
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
                          <td className="price-col">${(item.offer_price <= 0 ? item.price : item.offer_price)}</td>
                          <td className="quantity-col">
                            <div className="cart-product-quantity">
                              <div className="input-group input-spinner">
                                <div className="input-group-prepend">
                                  <button
                                    style={{ minWidth: 26 }}
                                    className="btn btn-decrement btn-spinner"
                                    type="button"
                                    onClick={() => handleCart(item?.id, item?.quantity - 1)}
                                  >
                                    <IonIcon icon={removeOutline} />
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  style={{ textAlign: "center" }}
                                  className="form-control"
                                  value={item.quantity}
                                  onChange={(e) => handleCart(item?.id, e.target.value)}

                                />
                                <div className="input-group-append">
                                  <button
                                    style={{ minWidth: 26 }}
                                    className="btn btn-increment btn-spinner"
                                    type="button"
                                    onClick={() => handleCart(item?.id, item?.quantity + 1)}
                                  >
                                    <IonIcon icon={addOutline} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="total-col">${(item.offer_price <= 0 ? item.price : item.offer_price * item.quantity).toFixed(2)}</td>
                          <td className="remove-col">
                            <button className="btn-remove" onClick={() => handleRemove(item.id)}>
                              <IonIcon icon={closeOutline} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* <div className="cart-bottom">
                    <Link to="#" className="btn btn-outline-dark-2">
                      <span>UPDATE CART</span>
                      <IonIcon icon={refreshOutline} />
                    </Link>
                  </div> */}
                </>
              ) : (
                <div className="empty-cart">
                  <IonIcon icon={cartOutline} size="large" />
                  <p>No items in the cart</p>
                  <Link to="/" className="continue-shopping btn btn-outline-dark-2 btn-block mb-3">
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
                  <Link to="/checkout" className="btn btn-outline-primary-2 btn-order btn-block">
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
                <Link to="/" className="btn btn-outline-dark-2 btn-block mb-3">
                  <span>CONTINUE SHOPPING</span>
                  <IonIcon icon={refreshOutline} />
                </Link>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
