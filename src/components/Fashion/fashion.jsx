import React from "react";
import "../../styles/fashion.css";
import { SectionTitle } from "../../common";
const Fashion = ({ images, header, interval = 3000 }) => {
  return (
    <div className="kids-fashion">
      <SectionTitle title={header?.title} subtitle={header?.description} />
      <div className="product-slider">
        <div className="product-images">
          {images.map((item, index) => (
            <img key={index} src={item.image} alt={`Product ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fashion;
