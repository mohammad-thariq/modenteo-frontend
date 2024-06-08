import React, { useState } from "react";
import { DangerousHTML } from "../../common";

const ProductDetailsTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("product-desc-tab");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "product-desc-tab" ? "active" : ""
              }`}
            onClick={() => handleTabClick("product-desc-tab")}
            href="#product-desc-tab"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected={activeTab === "product-desc-tab" ? "true" : "false"}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "product-info-tab" ? "active" : ""
              }`}
            onClick={() => handleTabClick("product-info-tab")}
            href="#product-info-tab"
            role="tab"
            aria-controls="product-info-tab"
            aria-selected={activeTab === "product-info-tab" ? "true" : "false"}
          >
            Additional information
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "product-shipping-tab" ? "active" : ""
              }`}
            onClick={() => handleTabClick("product-shipping-tab")}
            href="#product-shipping-tab"
            role="tab"
            aria-controls="product-shipping-tab"
            aria-selected={
              activeTab === "product-shipping-tab" ? "true" : "false"
            }
          >
            Shipping & Returns
          </a>
        </li>

      </ul>
      <div className="tab-content">
        <div
          className={`tab-pane fade ${activeTab === "product-desc-tab" ? "show active" : ""
            }`}
          id="product-desc-tab"
          role="tabpanel"
          aria-labelledby="product-desc-link"
        >
          <div className="product-desc-content">
            <h3>Product Information</h3>
            <p>
              {data?.short_description}
            </p>
          </div>
        </div>
        <div
          className={`tab-pane fade ${activeTab === "product-info-tab" ? "show active" : ""
            }`}
          id="product-info-tab"
          role="tabpanel"
          aria-labelledby="product-info-link"
        >
          <div className="product-desc-content">
            <h3>Information</h3>
            <p>
              <DangerousHTML html={data?.long_description}/>
            </p>
          </div>
        </div>
        <div
          className={`tab-pane fade ${activeTab === "product-shipping-tab" ? "show active" : ""
            }`}
          id="product-shipping-tab"
          role="tabpanel"
          aria-labelledby="product-shipping-link"
        >
          <div className="product-desc-content">
            <h3>Delivery & returns</h3>
            <p>
              We deliver to over 100 countries around the world. For full
              details of the delivery options we offer, please view our Delivery
              information
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsTab;
