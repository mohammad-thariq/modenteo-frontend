import { IonIcon } from "@ionic/react";
import { megaphone } from "ionicons/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ProductDetailsFooter = ({ product }) => {
  const navigate = useNavigate()
  let prdUrl = window.location.href;
  return (
    <div className="product-details-footer">
         <div className="product-details-footer-privacy" onClick={() =>navigate('/page/privacy-policy')}>
        <IonIcon icon={megaphone} />
        <p>Privacy policy</p>
      </div>
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
