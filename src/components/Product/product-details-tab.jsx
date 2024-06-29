import React, { useState } from "react";
import { DangerousHTML } from "../../common";
import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";

const ProductDetailsTab = ({ data }) => {
  const [activeTabs, setActiveTabs] = useState([]);

  const handleTabClick = (tabId) => {
    setActiveTabs((prevActiveTabs) =>
      prevActiveTabs.includes(tabId)
        ? prevActiveTabs.filter((id) => id !== tabId)
        : [...prevActiveTabs, tabId]
    );
  };
  const productTabOptions = [
    {
      tab: "Description",
      content: data?.short_description,
    },
    {
      tab: "Product Details",
      content: data?.long_description,
    },
    {
      tab: "Delivery & returns",
      description:
        "We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information",
    },
  ];

  return (
    <div className="product-details-tab-wrapper">
      {productTabOptions?.map((i, index) => (
        <div key={index}>
          <div
            className="product-details-tab-list"
            onClick={() => handleTabClick(index)}
          >
            <p>{i?.tab}</p>
            <IonIcon
              icon={activeTabs.includes(index) ? chevronUp : chevronDown}
              size="16px"
            />
          </div>
          {activeTabs.includes(index) && (
            <div className="product-details-tab-html">
              <DangerousHTML html={i?.content} />
              {i?.description && (
                <p className="product-details-tab-descripption">
                  {i?.description}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsTab;
