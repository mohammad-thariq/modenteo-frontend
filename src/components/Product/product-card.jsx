import React from 'react';
import '../../styles/product.css'; // Import the CSS file for styling
import { IonIcon } from '@ionic/react';
import { heartOutline, cartOutline, heartDislike } from 'ionicons/icons';
import { FaStar } from 'react-icons/fa'; // Using react-icons for star icons
import { BASE_URL } from '../../constants/url';
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { ManageCartApi, ManageWishlistApi } from '../../service';
import { LocalStorageHelper } from '../../utils/localStorage';
import { localStorageConst } from '../../constants/localStorage';
import { Redirect } from '../../helper/base';
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
const { getCart, addCart } = new ManageCartApi();
const { getWishlist, addWishlist, deleteWishlist } = new ManageWishlistApi();
const fetchCart = (userID) => () => getCart(userID);
const fetchWishlist = (userID) => () => getWishlist(userID);

const ProductCard = ({ data }) => {
    let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
    const { data: cartData, refetch } = useQuery('cart', fetchCart(userDetails?.id), { enabled: userDetails != null ? true : false });
    const { data: wishlistData, refetch: refetchWishlist } = useQuery('wishlist', fetchWishlist(userDetails?.id), { enabled: userDetails != null ? true : false });


    const { mutate: createCart } = useMutation(addCart, {
        onSuccess: (data) => {
            ToastifySuccess("Product Added to Cart");
            refetch();

        },
        onError: (error) => {
            ToastifyFailed(error?.message);
        },
    });

    function checkCartExists(productId) {
        if (cartData?.data !== undefined) {
            return cartData?.data.some(item => item.product_id === productId);
        } else {
            return false;
        }
    }
    function checkWishslistExists(productId) {
        if (wishlistData?.data !== undefined) {
            return wishlistData?.data.some(item => item.product_id === productId && item.user_id === userDetails?.id);
        } else {
            return false;
        }
    }

    const handleAddToCart = (data) => {
        if (userDetails) {
            let cartData = { product_id: data.id, user_id: userDetails?.id, quantity: 1 };
            createCart(cartData);
        } else {
            ToastifyFailed('Please log in to add products to your cart');
        }
    };

    const { mutate: createWishlist } = useMutation(addWishlist, {
        onSuccess: (data) => {
            ToastifySuccess("Product Added to Wishlist");
            refetchWishlist();

        },
        onError: (error) => {
            ToastifyFailed(error?.message);
        },
    });
    const { mutate: removeWishlist } = useMutation(deleteWishlist, {
        onSuccess: (data) => {
            ToastifySuccess("Wishlist Removed");
            refetchWishlist();

        },
        onError: (error) => {
            ToastifyFailed(error?.message);
        },
    });
    const handleAddToWishlist = (data) => {
        if (userDetails) {
            let wishlistData = { product_id: data.id, user_id: userDetails?.id };
            createWishlist(wishlistData);
        } else {
            ToastifyFailed('Please log in to add products to your wishlist');
        }
    };

    const handleRemoveWishlist = (data) => {
        let getwishlist = wishlistData?.data.find(item => item.product_id === data?.id && item.user_id === userDetails?.id);
        if (getwishlist) {
            removeWishlist(getwishlist?.id);
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
                    {checkWishslistExists(data.id) ? <button className="btn-product-icon btn-wishlist" onClick={() => { handleRemoveWishlist(data) }}>
                        <IonIcon icon={heartDislike} />
                        <span>View wishlist</span>
                    </button> : <button className="btn-product-icon btn-wishlist" onClick={() => handleAddToWishlist(data)}>
                        <IonIcon icon={heartOutline} />
                        <span>Add to wishlist</span>
                    </button>}
                </div>

                <div className="product-action">
                    {checkCartExists(data.id) ? <button className="btn-product btn-cart" onClick={() => Redirect('/cart')}>
                        <IonIcon icon={cartOutline} />
                        <span className='add-to-cart-btn'>View cart</span>
                    </button> :
                        <button className="btn-product btn-cart" onClick={() => handleAddToCart(data)}>
                            <IonIcon icon={cartOutline} />
                            <span className='add-to-cart-btn'>Add to cart</span>
                        </button>}
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
