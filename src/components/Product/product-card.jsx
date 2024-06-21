import React from "react";
import "../../styles/product.css";
import { IonIcon } from "@ionic/react";
import { heartOutline, heartDislike } from "ionicons/icons";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { ManageWishlistApi } from "../../service";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
const { getWishlist, addWishlist, deleteWishlist } = new ManageWishlistApi();
const fetchWishlist = (userID) => () => getWishlist(userID);

const ProductCard = ({ data }) => {
  let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const { data: wishlistData, refetch: refetchWishlist } = useQuery(
    "wishlist",
    fetchWishlist(userDetails?.id),
    { enabled: userDetails != null ? true : false }
  );

  function checkWishslistExists(productId) {
    if (wishlistData?.data !== undefined) {
      return wishlistData?.data.some(
        (item) =>
          item.product_id === productId && item.user_id === userDetails?.id
      );
    } else {
      return false;
    }
  }

  const { mutate: createWishlist } = useMutation(addWishlist, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Wishlist");
      refetchWishlist();
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
  const handleAddToWishlist = (data) => {
    if (userDetails) {
      let wishlistData = { product_id: data.id, user_id: userDetails?.id };
      createWishlist(wishlistData);
    } else {
      ToastifyFailed("Please log in to add products to your wishlist");
    }
  };

  const handleRemoveWishlist = (data) => {
    let getwishlist = wishlistData?.data.find(
      (item) => item.product_id === data?.id && item.user_id === userDetails?.id
    );
    if (getwishlist) {
      removeWishlist(getwishlist?.id);
    }
  };

  return (
    <div className="product product-7">
      <figure className="product-media">
        {data?.type === "new" ? (
          <span className="product-label label-new">New</span>
        ) : data?.type === "top" ? (
          <span className="product-label label-top">Top</span>
        ) : data?.type === "out" ? (
          <span className="product-label label-out">Out of Stock</span>
        ) : (
          <></>
        )}
        <a href={"/product/" + data?.slug}>
          <img
            src={data?.image || "/assets/home/images/products/1.jpg"}
            alt={data?.name}
            className="product-image"
          />
        </a>
        <div className="product-action-vertical">
          {checkWishslistExists(data?.id) ? (
            <button
              className="btn-product-icon btn-wishlist"
              onClick={() => {
                handleRemoveWishlist(data);
              }}
            >
              <IonIcon icon={heartDislike} />
              <span>View wishlist</span>
            </button>
          ) : (
            <button
              className="btn-product-icon btn-wishlist"
              onClick={() => handleAddToWishlist(data)}
            >
              <IonIcon icon={heartOutline} />
              <span>Add to wishlist</span>
            </button>
          )}
        </div>
      </figure>

      <div className="product-body">
        <h3 className="product-title">
          <a href={"/product/" + data?.slug}>{data?.name}</a>
        </h3>
        <div className="product-price">
          <span
            className={
              data?.offer_price !== 0 && data?.offer_price !== null
                ? "defaultPrice strikeout"
                : "defaultPrice"
            }
          >
            ${data?.price}
          </span>
         {data?.offer_price!=0 && <span className="offerPrice">${data?.offer_price}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
