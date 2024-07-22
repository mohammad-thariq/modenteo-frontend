import React from 'react';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="d-sm-flex  justify-content-sm-between">
                <span className="d-sm-flex   text-muted text-center text-sm-left d-block d-sm-inline-block">
                    Copyright © {currentYear} <a href="/" className='homelink' target="_blank"> Modenteo</a>. All rights reserved.
                    </span>
                {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span> */}
            </div>
        </footer>
    );
};

export default Footer;

