import React from 'react';
import { Header, Footer, SideBar } from '../../../common';
const BaseAccount = ({ children }) => {
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default BaseAccount;
