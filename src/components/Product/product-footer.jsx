import React from "react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ProductDetailsFooter = ({ product }) => {
  let prdUrl = window.location.href;
  return (
    <div className="product-details-footer">
      <div className="social-icons social-icons-sm">
        <span className="social-label">Share:</span>
        <FacebookShareButton url={prdUrl} quote={product.name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={prdUrl} title={product.name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={prdUrl} title={product.name}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ProductDetailsFooter;
