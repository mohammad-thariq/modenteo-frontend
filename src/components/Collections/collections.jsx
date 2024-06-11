import React from "react"
import { imgURL } from "../../config"
import { getNextJsOptimizedUrl } from "../../helper/image"
const Collections = ({ data, header }) => {
    return (
        <div className="container">
            {data.map((item, index) => {
                return (
                    <div className="testimonials-box" key={index}>
                        <div className="cta-container">
                            <img src={getNextJsOptimizedUrl(imgURL + item.image, 96, 75)}  alt={item?.title} className="cta-banner" />

                            {/* <img src={item?.image} alt={item?.title} className="cta-banner" /> */}
                            <a href={item?.page_url} className="cta-content">

                                <p className="discount">{item?.title}</p>

                                <h2 className="cta-title">{item?.sub_title}</h2>

                                <p className="cta-text">{item?.description}</p>

                                <button className="cta-btn">{item?.button_name}</button>

                            </a>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
export default Collections;