import React from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { Breadcrumb } from '../../common'
import { cartOutline, closeOutline, logoFacebook, logoTwitter, logoInstagram, logoYoutube, logoWhatsapp } from 'ionicons/icons';
import '../../styles/wishlist.css'
const Wishlist = () => {
    const wishlistItems = [
        {
            id: 1,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-2.jpg",
            title: 'Beige knitted elastic runner shoes',
            price: 84.00,
            stockStatus: 'In stock',
        },
        {
            id: 2,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-3.jpg",
            title: 'Blue utility pinafore denim dress',
            price: 76.00,
            stockStatus: 'In stock',
        },
        {
            id: 3,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-4.jpg",
            title: 'Orange saddle lock front chain cross body bag',
            price: 52.00,
            stockStatus: 'Out of stock',
        },
    ];

    return (
        <div className="page-content">
            <Breadcrumb />
            <div className="container">
                <table className="table table-wishlist table-mobile">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((item) => (
                            <tr key={item.id}>
                                <td className="product-col">
                                    <div className="product">
                                        <figure className="product-media">
                                            <Link to="#">
                                                <img src={item.image} alt="Product" />
                                            </Link>
                                        </figure>
                                        <h3 className="product-title">
                                            <Link to="#">{item.title}</Link>
                                        </h3>
                                    </div>
                                </td>
                                <td className="price-col">${item.price.toFixed(2)}</td>
                                <td className="stock-col">
                                    <span className={item.stockStatus === 'In stock' ? 'in-stock' : 'out-of-stock'}>
                                        {item.stockStatus}
                                    </span>
                                </td>
                                <td className="action-col">
                                    {item.stockStatus === 'In stock' ? (
                                        <button className="btn btn-cart btn-block btn-outline-primary-2">
                                            <IonIcon icon={cartOutline} /> Add to Cart
                                        </button>
                                    ) : (
                                        <button className="btn btn-cart btn-block btn-outline-primary-2 disabled">
                                            Out of Stock
                                        </button>
                                    )}
                                </td>
                                <td className="remove-col">
                                    <button className="btn-remove">
                                        <IonIcon icon={closeOutline} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="wishlist-share">
                    <div className="social-icons social-icons-sm mb-2">
                        <label className="social-label">Share on:</label>
                        <div className='social-links'>
                            <Link to="#" className="social-icon" title="Facebook" target="_blank"><IonIcon icon={logoFacebook} /></Link>
                            <Link to="#" className="social-icon" title="Twitter" target="_blank"><IonIcon icon={logoTwitter} /></Link>
                            <Link to="#" className="social-icon" title="Instagram" target="_blank"><IonIcon icon={logoInstagram} /></Link>
                            <Link to="#" className="social-icon" title="YouTube" target="_blank"><IonIcon icon={logoYoutube} /></Link>
                            <Link to="#" className="social-icon" title="WhatsApp" target="_blank"><IonIcon icon={logoWhatsapp} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
