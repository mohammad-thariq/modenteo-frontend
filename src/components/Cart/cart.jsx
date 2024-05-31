import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { closeOutline, addOutline, removeOutline, refreshOutline, cartOutline } from "ionicons/icons";
import { Breadcrumb } from "../../common";
import "../../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Beige knitted elastic runner shoes",
      price: 84.00,
      quantity: 1,
      image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-2.jpg",
    },
    {
      id: 2,
      name: "Blue utility pinafore denim dress",
      price: 76.00,
      quantity: 1,
      image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-4.jpg",
    },
  ]);

  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

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
                                <Link to="#">
                                  <img src={item.image} alt="Product" />
                                </Link>
                              </figure>
                              <h3 className="product-title">
                                <Link to="#">{item.name}</Link>
                              </h3>
                            </div>
                          </td>
                          <td className="price-col">${item.price.toFixed(2)}</td>
                          <td className="quantity-col">
                            <div className="cart-product-quantity">
                              <div className="input-group input-spinner">
                                <div className="input-group-prepend">
                                  <button
                                    style={{ minWidth: 26 }}
                                    className="btn btn-decrement btn-spinner"
                                    type="button"
                                    onClick={() => handleDecrement(item.id)}
                                  >
                                    <IonIcon icon={removeOutline} />
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  style={{ textAlign: "center" }}
                                  className="form-control"
                                  value={item.quantity}
                                  readOnly
                                />
                                <div className="input-group-append">
                                  <button
                                    style={{ minWidth: 26 }}
                                    className="btn btn-increment btn-spinner"
                                    type="button"
                                    onClick={() => handleIncrement(item.id)}
                                  >
                                    <IonIcon icon={addOutline} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="total-col">${(item.price * item.quantity).toFixed(2)}</td>
                          <td className="remove-col">
                            <button className="btn-remove" onClick={() => handleRemove(item.id)}>
                              <IonIcon icon={closeOutline} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-bottom">
                    <Link to="#" className="btn btn-outline-dark-2">
                      <span>UPDATE CART</span>
                      <IonIcon icon={refreshOutline} />
                    </Link>
                  </div>
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
