import React from 'react';
import '../../styles/banner-category.css';
import { FaArrowRight } from 'react-icons/fa';


const BannerCategory = () => {
    return (
        <section className="banner_section1 mb-200" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/img/new.jpg)` }}>
            <div className="container">
                <div className="banner_container d-flex">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 p200 banner-left-content">
                            <div className="left-inner-content">
                                <h2>Browse By Categories</h2>
                                <p className="browse_category" style={{ marginTop: '2rem', marginBottom: '2rem' }}>Explore Our curated collection of stylish clothing tailored to your unique taste.</p>
                                <p><a className="btn btn-primary3 text-black" href="/product-list">Shop Now</a></p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="shop-categories">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6">
                                        <a href="/kids-dashboard">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/img/mask-group2.png"} alt="" />
                                        </a>
                                        <div className="categories-list">
                                            <a href="/product-list">Girls <span>
                                                <FaArrowRight/>
                                            </span></a>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <a href="/women-dashboard">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/img/mask-group1.png"} alt="" />
                                        </a>
                                        <div className="categories-list">
                                            <a href="/product-list">Women   <span> <FaArrowRight/></span></a>
                                          
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <a href="/kids-dashboard">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/img/mask-group3.png"} alt="" />
                                        </a>
                                        <div className="categories-list">
                                            <a href="/product-list">boys    <span> <FaArrowRight/></span></a>
                                         
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <a href="/Men-dashboard">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/img/mask-group.png"} alt="" />
                                        </a>
                                        <div className="categories-list">
                                            <a href="/product-list">Men  <span> <FaArrowRight/></span></a>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerCategory;
