import React, { useState } from "react";

const ProductDetailsTab = () => {
    const [activeTab, setActiveTab] = useState('product-desc-tab'); 
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'product-desc-tab' ? 'active' : ''}`} onClick={() => handleTabClick('product-desc-tab')} href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected={activeTab === 'product-desc-tab' ? 'true' : 'false'}>Description</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'product-info-tab' ? 'active' : ''}`} onClick={() => handleTabClick('product-info-tab')} href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected={activeTab === 'product-info-tab' ? 'true' : 'false'}>Additional information</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'product-shipping-tab' ? 'active' : ''}`} onClick={() => handleTabClick('product-shipping-tab')} href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected={activeTab === 'product-shipping-tab' ? 'true' : 'false'}>Shipping & Returns</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'product-review-tab' ? 'active' : ''}`} onClick={() => handleTabClick('product-review-tab')} href="#product-review-tab" role="tab" aria-controls="product-review-tab" aria-selected={activeTab === 'product-review-tab' ? 'true' : 'false'}>Reviews (2)</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'product-desc-tab' ? 'show active' : ''}`} id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                    <div className="product-desc-content">
                        <h3>Product Information</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                    </div>
                </div>
                <div className={`tab-pane fade ${activeTab === 'product-info-tab' ? 'show active' : ''}`} id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                    <div className="product-desc-content">
                        <h3>Information</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.</p>
                    </div>
                </div>
                <div className={`tab-pane fade ${activeTab === 'product-shipping-tab' ? 'show active' : ''}`} id="product-shipping-tab" role="tabpanel" aria-labelledby="product-shipping-link">
                    <div className="product-desc-content">
                        <h3>Delivery & returns</h3>
                        <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information</p>
                    </div>
                </div>
                <div className={`tab-pane fade ${activeTab === 'product-review-tab' ? 'show active' : ''}`} id="product-review-tab" role="tabpanel" aria-labelledby="product-review-link">
                    <div className="reviews">
                        <h3>Reviews (2)</h3>
                        <div className="review">
                            <div className="row no-gutters">
                                <div className="col-auto">
                                    <h4><a href="#">Samanta J.</a></h4>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                    <span className="review-date">6 days ago</span>
                                </div>
                                <div className="col">
                                    <h4>Good, perfect size</h4>
                                    <div className="review-content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review">
                            <div className="row no-gutters">
                                <div className="col-auto">
                                    <h4><a href="#">John Doe</a></h4>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                    <span className="review-date">5 days ago</span>
                                </div>
                                <div className="col">
                                    <h4>Very good</h4>
                                    <div className="review-content">
                                        <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsTab;