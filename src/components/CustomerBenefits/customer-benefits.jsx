import React from "react";
const CustomerBenefits = () => {
    return (
        <div className="category">
            <div className="container">
                <div className="category-item-container has-scrollbar">
                    <div className="category-item">
                        <div className="category-img-box">
                            <img src={process.env.PUBLIC_URL +"/assets/images/services/shipping.png"} alt="Free Shipping" width="30"/>
                        </div>
                        <div className="category-content-box">
                            <div className="category-content-flex">
                                <h3 className="category-item-title">Free Shipping</h3>
                            </div>
                            <a href="/" className="category-btn">Orders Over $100</a>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img-box">
                            <img src={process.env.PUBLIC_URL +"/assets/images/services/warranty.png"} alt="Warrenty Protection" width="30"/>
                        </div>
                        <div className="category-content-box">
                            <div className="category-content-flex">
                                <h3 className="category-item-title">Warrenty Protection</h3>
                            </div>
                            <a href="/" className="category-btn">Over 2 Years</a>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img-box">
                            <img src={process.env.PUBLIC_URL +"/assets/images/services/returnpolicy.png"} alt="Return Policy" width="30"/>
                        </div>
                        <div className="category-content-box">
                            <div className="category-content-flex">
                                <h3 className="category-item-title">Return Policy</h3>
                            </div>
                            <a href="/" className="category-btn">Easy & Free Return</a>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img-box">
                            <img src={process.env.PUBLIC_URL +"/assets/images/services/support.png"} alt="24/7 Support" width="30"/>
                        </div>
                        <div className="category-content-box">
                            <div className="category-content-flex">
                                <h3 className="category-item-title">24/7 Support</h3>
                            </div>
                            <a href="/" className="category-btn">Dedicated Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CustomerBenefits;