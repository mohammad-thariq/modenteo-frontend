import React from 'react';
import '../../styles/product.css'; // Import the CSS file for styling
import { IonIcon } from '@ionic/react';
import { heartOutline, cartOutline } from 'ionicons/icons';
import { FaStar } from 'react-icons/fa'; // Using react-icons for star icons
import { BASE_URL,BACKEND_IMG_URL} from '../../constants/url';
import { getNextJsOptimizedUrl } from '../../helper/image';

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

    const handleAddToWishlist = () => {
        // Logic for adding to Wishlist
        console.log('Add to Wishlist');
    };

    const handleAddToCart = () => {
        // Logic for adding to Cart
        console.log('Add to Cart');
    };

    return (

            <div className="product product-7">
                <figure className="product-media">
                    {data?.type === 'new' ? <span className="product-label label-new">New</span> : data?.type === 'top' ?
                        <span className="product-label label-top">Top</span> : data?.type === 'out' ?
                            <span className="product-label label-out">Out of Stock</span> : <></>}
                    <a href={BASE_URL +"product/"+ data?.slug}>
                        <img  src={getNextJsOptimizedUrl(BACKEND_IMG_URL + data.image, 96, 75)}  alt={data?.name} className="product-image" />
                    </a>
                    <div className="product-action-vertical">
                        <button className="btn-product-icon btn-wishlist btn-expandable" onClick={handleAddToWishlist}>
                            <IonIcon icon={heartOutline} />
                            <span>Add to wishlist</span>
                        </button>
                    </div>

                    <div className="product-action">
                        <button className="btn-product btn-cart" onClick={handleAddToCart}>
                            <IonIcon icon={cartOutline} />
                            <span className='add-to-cart-btn'>Add to cart</span>
                        </button>
                    </div>
                </figure>

                <div className="product-body">
                    <h3 className="product-title">
                        <a href={BASE_URL +"product/"+ data?.slug}>{data?.name}</a>
                    </h3>
                    <div className="product-price">
                        $60.00
                    </div>
                    <StarRating rating={2} reviews={2} />
                </div>
            </div>
    )
};


export default ProductCard;
