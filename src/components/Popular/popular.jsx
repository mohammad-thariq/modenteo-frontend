import React from 'react';
import '../../styles/popular.css'
import { SectionTitle } from '../../common';
const Popular = () => {
    return (
        <div className='container' style={{ marginBottom: "10px" }}>
            <SectionTitle title="Popular Right Now" subtitle="Getting the best and latest style has never been easier" />
            <div className="row">
                <div className="col-md-6 col-lg-6">
                    <div className="member">
                        <a href="/women-dashboard">
                            <img src={process.env.PUBLIC_URL + "/assets/home/images/banner-1.jpg"} className="img-responsive img-thumbnail" alt="Responsive" />
                        </a>
                        <div className="name">
                            <a href="/product-detail"><b>Trending For Women<span></span></b>
                            </a>
                            Explore Now!</div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6">
                    <div className="member">
                        <a href="/Men-dashboard">
                            <img src={process.env.PUBLIC_URL + "/assets/home/images/banner-2.jpg"} className="img-responsive img-thumbnail" alt="Responsive" />
                        </a>
                        <div className="name">
                            <a href="/product-detail"><b>Trending For Men <span></span></b>
                            </a>
                            Explore Now!</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Popular;
