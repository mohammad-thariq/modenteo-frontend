import React, { useEffect, useState } from "react";
import ProductDetailsFooter from "./product-footer";
import { IonIcon } from "@ionic/react";
import { heartOutline, star, starOutline, cartOutline, heartDislike } from "ionicons/icons";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { ManageCartApi, ManageWishlistApi } from "../../service";
import { useMutation, useQuery } from "react-query";
import { Loading } from '../../common';

const ProductDetails = ({ data }) => {
  const [qty, setQty] = useState(1);
  const [existingCart, setExistingCart] = useState([]);

  const userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const { addCart, getCart, updateCart } = new ManageCartApi();
  const { addWishlist, deleteWishlist, getWishlist } = new ManageWishlistApi();

  const { data: cartData, isLoading, refetch } = useQuery('cart', () => getCart(userDetails?.id), {
    enabled: !!userDetails,
  });

  const { data: wishlistData, isLoading: isLoadingWishlist, refetch: refetchWishlist } = useQuery('wishlist', () => getWishlist(userDetails?.id), {
    enabled: !!userDetails,
  });

  useEffect(() => {
    if (cartData) {
      const checkCartExists = (id) => {
        return cartData?.data ? cartData.data.filter(item => item.product_id === id) : [];
      };

      const cartDetails = checkCartExists(data?.id);
      setExistingCart(cartDetails);
      if (cartDetails.length > 0) {
        setQty(cartDetails[0].quantity);
      }
    }
  }, [cartData, data?.id]);

  const { mutate: createCart } = useMutation(addCart, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Cart");
      refetch();
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const { mutate: cartUpdate } = useMutation(updateCart, {
    onSuccess: () => {
      ToastifySuccess("Quantity Updated");
      refetch();
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const { mutate: removeWishlist } = useMutation(deleteWishlist, {
    onSuccess: () => {
      ToastifySuccess("Wishlist Removed");
      refetchWishlist();
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const handleRemoveWishlist = () => {
    const getWishlistItem = wishlistData?.data.find(item => item.product_id === data?.id && item.user_id === userDetails?.id);
    if (getWishlistItem) {
      removeWishlist(getWishlistItem.id);
    }
  };

  const handleUpdateToCart = (id) => {
    cartUpdate({ id, quantity: qty });
  };

  const handleAddToCart = () => {
    if (userDetails) {
      const cartData = { product_id: data.id, user_id: userDetails?.id, quantity: qty };
      createCart(cartData);
    } else {
      ToastifyFailed('Please log in to add products to your cart');
    }
  };

  const { mutate: createWishlist } = useMutation(addWishlist, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Wishlist");
      refetchWishlist();
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const handleAddToWishlist = () => {
    if (userDetails) {
      const wishlistData = { product_id: data.id, user_id: userDetails?.id };
      createWishlist(wishlistData);
    } else {
      ToastifyFailed('Please log in to add products to your wishlist');
    }
  };

  const checkWishlistExists = (productId) => {
    return wishlistData?.data ? wishlistData.data.some(item => item.product_id === productId && item.user_id === userDetails?.id) : false;
  };

  return (
    <div className="col-md-6">
      <div className="product-details">
        <h1 className="product-title">{data?.name}</h1>

        <div className="ratings-container">
          <div className="ratings">
            <IonIcon icon={star} />
            <IonIcon icon={star} />
            <IonIcon icon={star} />
            <IonIcon icon={star} />
            <IonIcon icon={starOutline} />
          </div>
          <a className="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews )</a>
        </div>

        <div className="product-price">${data?.price}</div>

        <div className="product-content">
          <p>{data?.short_description}</p>
        </div>

        <div className="details-filter-row details-row-size">
          <label htmlFor="qty">Qty:</label>
          <div className="product-details-quantity">
            <input
              type="number"
              className="form-control"
              style={{ textAlign: "center" }}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>
        </div>

        {(isLoading || isLoadingWishlist) ? <Loading /> : (
          <div className="product-details-action cart-screen">
            {existingCart.length > 0 ? (
              <span onClick={() => handleUpdateToCart(existingCart[0].id)} className="btn-product btn-cart">
                <IonIcon icon={cartOutline} />
                <span>Update Cart</span>
              </span>
            ) : (
              <span onClick={handleAddToCart} className="btn-product btn-cart">
                <IonIcon icon={cartOutline} />
                <span>Add to Cart</span>
              </span>
            )}
            {checkWishlistExists(data?.id) ? (
              <span onClick={handleRemoveWishlist} className="btn-product btn-cart" title="Wishlist">
                <IonIcon icon={heartDislike} />
                <span>Remove Wishlist</span>
              </span>
            ) : (
              <span onClick={handleAddToWishlist} className="btn-product btn-cart" title="Wishlist">
                <IonIcon icon={heartOutline} />
                <span>Add to Wishlist</span>
              </span>
            )}
          </div>
        )}
      </div>
      <ProductDetailsFooter />
    </div>
  );
};

export default ProductDetails;
