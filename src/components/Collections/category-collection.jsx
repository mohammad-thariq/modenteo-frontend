import React from 'react';
import '../../styles/category-collection.css'; // Import your CSS file for styling
import { SectionTitle } from '../../common';
const CategoryCollection = () => {
    return (
        <section className="collections-sec">
            <div className="container">
                <div className="section_title1">
                <SectionTitle title="Make Your Choice" subtitle="Get in on the trend with our curated selection of best-selling styles."/>
                </div>
                <div className="makechoice">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <a href="/Season-dashboard">
                                <div className="choises-outer winter-outer">
                                    <div className="d-flex align-items-center">
                                        <p><b>Winter Collections</b></p>
                                        <div><img src={process.env.PUBLIC_URL + "/assets/images/img/winter.png"} alt="Snow" /></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <a href="/Season-dashboard">
                                <div className="choises-outer trendy-outer">
                                    <div className="d-flex align-items-center">
                                        <p><b>Trendy Collections</b></p>
                                        <div><img src={process.env.PUBLIC_URL + "/assets/images/img/trendy.png"} alt="Snow" /></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <a href="/Season-dashboard">
                                <div className="choises-outer stylish-outer">
                                    <div className="d-flex align-items-center" style={{ flexDirection: 'row-reverse' }}>
                                        <div><img src={process.env.PUBLIC_URL + "/assets/images/img/stylish.png"} alt="Snow" /></div>
                                        <p><b>Browse By Offer</b></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryCollection;
