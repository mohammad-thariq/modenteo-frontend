import React from "react";
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, logoInstagram, logoPinterest } from 'ionicons/icons';

const ProductDetailsFooter = () => {
    return (
        <div className="product-details-footer">
            <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <a href="#" className="social-icon" title="Facebook" target="_blank">
                    <IonIcon icon={logoFacebook} />
                </a>
                <a href="#" className="social-icon" title="Twitter" target="_blank">
                    <IonIcon icon={logoTwitter} />
                </a>
                <a href="#" className="social-icon" title="Instagram" target="_blank"><IonIcon icon={logoInstagram} /></a>
                <a href="#" className="social-icon" title="Pinterest" target="_blank"><IonIcon icon={logoPinterest} /></a>
            </div>
        </div>
    );
};

export default ProductDetailsFooter;