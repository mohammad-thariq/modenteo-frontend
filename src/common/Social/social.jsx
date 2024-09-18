import React from "react";
import { IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, logoInstagram, logoWhatsapp } from 'ionicons/icons';

export const Social = () => {
    return (
        <>
            <li>
                <a href="/" className="social-link">
                    <IonIcon icon={logoFacebook} />

                </a>
            </li>

            <li>
                <a href="/" className="social-link">
                    <IonIcon icon={logoTwitter} />
                </a>
            </li>

            <li>
                <a href="/" className="social-link">
                    <IonIcon icon={logoInstagram} />
                </a>
            </li>

            <li>
                <a href="/" className="social-link">
                    <IonIcon icon={logoWhatsapp} />
                </a>
            </li>
        </>
    )
}

export const SocialFooter = () => {
    return (
        <ul className="social-link" style={{paddingLeft: 0}}>

            <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                    <IonIcon icon={logoFacebook} />
                </a>
            </li>

            <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                    <IonIcon icon={logoTwitter} />
                </a>
            </li>

            <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                    <IonIcon icon={logoInstagram} />
                </a>
            </li>

            <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                    <IonIcon icon={logoWhatsapp} />
                </a>
            </li>

        </ul>
    )
}
