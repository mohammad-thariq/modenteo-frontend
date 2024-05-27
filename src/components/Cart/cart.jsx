import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  closeOutline,
  addOutline,
  removeOutline,
  refreshOutline,
} from "ionicons/icons";
import { Breadcrumb } from "../../common";
import "../../styles/cart.css";
const Cart = () => {
  return (
    <div className="page-content">
      <Breadcrumb />
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
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
                  <tr>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-media">
                          <Link to="#">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/home/images/products/clothes-2.jpg"
                              }
                              alt="Product"
                            />
                          </Link>
                        </figure>
                        <h3 className="product-title">
                          <Link to="#">Beige knitted elastic runner shoes</Link>
                        </h3>
                      </div>
                    </td>
                    <td className="price-col">$84.00</td>
                    <td className="quantity-col">
                      <div className="cart-product-quantity">
                        <div className="input-group input-spinner">
                          <div className="input-group-prepend">
                            <button
                              style={{ minWidth: 26 }}
                              className="btn btn-decrement btn-spinner"
                              type="button"
                            >
                              <IonIcon icon={removeOutline} />
                            </button>
                          </div>
                          <input
                            type="text"
                            style={{ textAlign: "center" }}
                            className="form-control"
                            required
                            placeholder=""
                          />
                          <div className="input-group-append">
                            <button
                              style={{ minWidth: 26 }}
                              className="btn btn-increment btn-spinner"
                              type="button"
                            >
                              <IonIcon icon={addOutline} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="total-col">$84.00</td>
                    <td className="remove-col">
                      <button className="btn-remove">
                        <IonIcon icon={closeOutline} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-media">
                          <Link to="#">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/home/images/products/clothes-4.jpg"
                              }
                              alt="Product"
                            />
                          </Link>
                        </figure>
                        <h3 className="product-title">
                          <Link to="#">Blue utility pinafore denim dress</Link>
                        </h3>
                      </div>
                    </td>
                    <td className="price-col">$76.00</td>
                    <td className="quantity-col">
                      <div className="cart-product-quantity">
                        <div className="input-group input-spinner">
                          <div className="input-group-prepend">
                            <button
                              style={{ minWidth: 26 }}
                              className="btn btn-decrement btn-spinner"
                              type="button"
                            >
                              <IonIcon icon={removeOutline} />
                            </button>
                          </div>
                          <input
                            type="text"
                            style={{ textAlign: "center" }}
                            className="form-control"
                            required
                            placeholder=""
                          />
                          <div className="input-group-append">
                            <button
                              style={{ minWidth: 26 }}
                              className="btn btn-increment btn-spinner"
                              type="button"
                            >
                              <IonIcon icon={addOutline} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="total-col">$76.00</td>
                    <td className="remove-col">
                      <button className="btn-remove">
                        <IonIcon icon={closeOutline} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="cart-bottom">
                <Link to="#" className="btn btn-outline-dark-2">
                  <span>UPDATE CART</span>
                  <IonIcon icon={refreshOutline} />
                </Link>
              </div>
            </div>
            <aside className="col-lg-3">
              <div className="summary summary-cart">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                  <tbody>
                    <tr className="summary-subtotal">
                      <td>Subtotal:</td>
                      <td>$160.00</td>
                    </tr>

                    <tr className="summary-total">
                      <td>Total:</td>
                      <td>$160.00</td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  to="checkout.html"
                  className="btn btn-outline-primary-2 btn-order btn-block"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
              <Link
                to="category.html"
                className="btn btn-outline-dark-2 btn-block mb-3"
              >
                <span>CONTINUE SHOPPING</span>
                <IonIcon icon={refreshOutline} />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
