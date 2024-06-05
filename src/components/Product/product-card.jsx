import React from 'react';
import '../../styles/product.css'; // Import the CSS file for styling
import { IonIcon } from '@ionic/react';
import { heartOutline, cartOutline } from 'ionicons/icons';
import { FaStar } from 'react-icons/fa'; // Using react-icons for star icons
import { BASE_URL } from '../../constants/url';
import { useMutation } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { ManageCartApi } from '../../service';
import { LocalStorageHelper } from '../../utils/localStorage';
import { localStorageConst } from '../../constants/localStorage';

const StarRating = ({ rating, reviews }) => {
    const totalStars = 5;

    return (
        <div className="ratings-container">
            <div className="ratings">
                {[...Array(totalStars)].map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={20}
                            color={index < rating ? "#ffc107" : "#e4e5e9"} // Gold for filled stars, grey for empty stars
                            style={{ marginRight: 2 }}
                        />
                    );
                })}
            </div>
            <span className="ratings-text">({reviews} Reviews)</span>
        </div>
    );
};

const ProductCard = ({ data }) => {
    const { addCart } = ManageCartApi;
    const { mutate: createCart } = useMutation(addCart, {
        onSuccess: (data) => {
            ToastifySuccess(data?.message);
            console.log(data, 'onSuccess');
        },
        onError: (error) => {
            console.log(error, 'onError');
            ToastifyFailed(error?.message);
        },
    });

    const handleAddToWishlist = () => {
        // Logic for adding to Wishlist
        console.log('Add to Wishlist');
    };

    const handleAddToCart = (data) => {
        let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
        if (userDetails) {
            let cartData = { product_id: data?.id, user_id: userDetails?.id, quantity: 1 };
            createCart(cartData);
        } else {
            ToastifyFailed('User not logged in');
        }
    };

    return (
        <div className="product product-7">
            <figure className="product-media">
                {data?.type === 'new' ? <span className="product-label label-new">New</span> : data?.type === 'top' ?
                    <span className="product-label label-top">Top</span> : data?.type === 'out' ?
                        <span className="product-label label-out">Out of Stock</span> : <></>}
                <a href={BASE_URL + "product/" + data?.slug}>
                    <img src={process.env.PUBLIC_URL + "/assets/home/images/products/1.jpg"}
                        alt={data?.name} className="product-image" />
                </a>
                <div className="product-action-vertical">
                    <button className="btn-product-icon btn-wishlist btn-expandable" onClick={handleAddToWishlist}>
                        <IonIcon icon={heartOutline} />
                        <span>Add to wishlist</span>
                    </button>
                </div>

                <div className="product-action">
                    <button className="btn-product btn-cart" onClick={() => handleAddToCart(data)}>
                        <IonIcon icon={cartOutline} />
                        <span className='add-to-cart-btn'>Add to cart</span>
                    </button>
                </div>
            </figure>

            <div className="product-body">
                <h3 className="product-title">
                    <a href={BASE_URL + "product/" + data?.slug}>{data?.name}</a>
                </h3>
                <div className="product-price">
                    <span className={data?.offer_price !== 0 && data?.offer_price !== null ? 'defaultPrice strikeout' : 'defaultPrice'}>${data?.price}</span>
                    <span className='offerPrice'>${data?.offer_price}</span>
                </div>
                <StarRating rating={2} reviews={2} />
            </div>
        </div>
    );
};

export default ProductCard;
