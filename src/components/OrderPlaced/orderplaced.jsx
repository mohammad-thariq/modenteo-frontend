import React from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import { Breadcrumb } from "../../common";
import "../../styles/orderplaced.css";
import { useLocation } from 'react-router-dom';

const OrderPlaced = () => {
    const location = useLocation();
    const currentUrl = location.href || window.location.href;
    const splitUrl = currentUrl.split('#');
    const orderId = splitUrl[1];
  

    return (
        <div className="page-content">
            <Breadcrumb />
            <div className="order-placed">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="thank-you-icon">
                                <IonIcon icon={checkmarkCircleOutline} size="large" color="success" />
                            </div>
                            <h2>Thank You!</h2>
                            <p>Your order #{orderId} has been placed successfully.</p>
                            <div className="center-btn">
                                <Link to="/" className="btn btn-outline-primary-2">
                                    <span>CONTINUE SHOPPING</span>
                                </Link>
                                <Link to="/orders" className="btn btn-outline-primary-2">
                                    <span>VIEW ORDER DETAILS</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPlaced;
