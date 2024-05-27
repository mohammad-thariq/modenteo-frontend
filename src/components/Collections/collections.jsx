import React from "react"
const Collections = () => {
    return (
        <div className="container">
            <div className="testimonials-box">
                <div className="cta-container">
                    <img src={process.env.PUBLIC_URL + "/assets/home/images/cta-banner.jpg"} alt="summer collection" className="cta-banner" />

                    <a href="/" className="cta-content">

                        <p className="discount">25% Discount</p>

                        <h2 className="cta-title">Summer collection</h2>

                        <p className="cta-text">Starting @ $10</p>

                        <button className="cta-btn">Shop now</button>

                    </a>
                </div>
            </div>
        </div>
    )
}
export default Collections;