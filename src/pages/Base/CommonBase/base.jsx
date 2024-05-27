import React from 'react';
import { WebsiteHeader, WebsiteFooter, ScrollToTopButton } from '../../../common';
const Base = ({ children }) => {
    return (
        <div className="container-scroller top">
            <script src={process.env.PUBLIC_URL + "/assets/home/js/script.js"}></script>
            <div className="overlay" data-overlay></div>
            <WebsiteHeader />
            {children}
            <WebsiteFooter />
            <ScrollToTopButton />
        </div>
    );
};

export default Base;
