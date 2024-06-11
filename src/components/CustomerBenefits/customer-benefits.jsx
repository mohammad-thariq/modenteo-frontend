import React from "react";
import { imgURL } from "../../config";
import { getNextJsOptimizedUrl } from "../../helper/image";
import { SectionTitle } from "../../common";
const CustomerBenefits = ({ data, header }) => {
    return (
        <div className="category">
            <SectionTitle title={header?.title} subtitle={header?.description} />
            <div className="container">
                <div className="category-item-container has-scrollbar">
                    {data.map((item, key) => {
                        return (
                            <div key={key} className="category-item">
                                <div className="category-img-box">
                                    <img src={getNextJsOptimizedUrl(imgURL + item.image, 96, 75)} alt={item?.badge} width="30" />
                                </div>
                                <div className="category-content-box">
                                    <div className="category-content-flex">
                                        <h3 className="category-item-title">{item?.badge}</h3>
                                    </div>
                                    <a href="/" className="category-btn">{item?.description}</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default CustomerBenefits;