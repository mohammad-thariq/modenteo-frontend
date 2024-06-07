import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { closeOutline, cartOutline, refreshOutline } from "ionicons/icons";
import { Breadcrumb, Loading, Error } from "../../common";
import "../../styles/checkout.css";
import { ManageCartApi, ManageOrderApi } from "../../service";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { useQuery,useMutation } from "react-query";
import { ToastifyFailed } from "../../common/Toastify";
const { getCart } = new ManageCartApi();
const { createOrder } = new ManageOrderApi();
const fetchCart = (userID) => () => getCart(userID);

const Checkout = () => {
    let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);

    const { data: cartData, isLoading, isError, error, refetch } = useQuery('cart', fetchCart(userDetails?.id));
    const [cartItems, setCartItems] = useState([]);
    const { mutate: createOrderMutate } =
        useMutation(createOrder, {
            onSuccess: (data, variables, context) => {
                console.log("success")
            },
            onError: (data, variables, context) => {

                ToastifyFailed(data?.message);
            },
        });
    useEffect(() => {
        if (cartData?.data && Array.isArray(cartData?.data)) {
            setCartItems(cartData?.data);
        }
    }, [cartData])
    const handleRemove = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.offer_price <= 0 ? item.price : item.offer_price) * item.quantity, 0).toFixed(2);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your form submission logic here
        console.log("Checkout form submitted");
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error message={error.message} onRetry={refetch} />
    }
    const placeOrder = () => {
        
        let data = {
            "user_id": 34, "billing_id": 1, "payment_status": 1, "order_status": 1, "total_amount": calculateTotal(), "shipping_method": "", "shipping_cost": 0, "discount_amount": 10, "mode_of_payment": "COD", "transection_id": 1,
            "products": cartData?.data
        }
        createOrderMutate(data);
        // console.log(data, "dat")
    }

    return (
        <div className="cart page-content">
            <Breadcrumb />
            <div className="checkout">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {cartItems.length > 0 ? (
                                <>
                                    <table className="table table-checkout table-mobile">
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
                                                                <Link to={"/product/" + item?.slug}>{item.name}</Link>
                                                            </h3>
                                                        </div>
                                                    </td>
                                                    <td className="price-col">${item.price.toFixed(2)}</td>
                                                    <td className="quantity-col">{item.quantity}</td>
                                                    <td className="total-col">${(item.offer_price <= 0 ? item.price : item.offer_price)}</td>
                                                    <td className="remove-col">
                                                        <button className="btn-remove" onClick={() => handleRemove(item.id)}>
                                                            <IonIcon icon={closeOutline} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <form onSubmit={handleSubmit}>
                                                <div className="checkout-form">
                                                    <h4>Billing Details</h4>
                                                    <div className="row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="name">Full Name</label>
                                                            <input type="text" id="name" className="form-control" required />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="email">Email Address</label>
                                                            <input type="email" id="email" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="address">Address</label>
                                                            <input type="text" id="address" className="form-control" required />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="city">City</label>
                                                            <input type="text" id="city" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="postal-code">Postal Code</label>
                                                            <input type="text" id="postal-code" className="form-control" required />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="country">Country</label>
                                                            <input type="text" id="country" className="form-control" required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
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
                                                <button onClick={() => placeOrder()} className="btn btn-outline-primary-2 btn-order btn-block">
                                                    PROCEED TO PAYMENT
                                                </button>
                                            </div>
                                            <Link to="/" className="btn btn-outline-dark-2 btn-block mb-3">
                                                <span>CONTINUE SHOPPING</span>
                                            </Link>
                                        </aside>
                                    </div>
                                </>
                            ) : (
                                <div className="empty-cart">
                                    <IonIcon icon={cartOutline} size="large" />
                                    <p>No items in your cart</p>
                                    <Link to="/" className="continue-shopping btn btn-outline-dark-2 btn-block mb-3">
                                        <span>CONTINUE SHOPPING</span>
                                        <IonIcon icon={refreshOutline} />
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
