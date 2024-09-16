import React from "react";
import "../../styles/product.css";
import { IonIcon } from "@ionic/react";
import { heartOutline, heartDislike } from "ionicons/icons";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import { ManageWishlistApi } from "../../service";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { calculateDiscountPercentage } from "../../utils/percentageCal";
import { useNavigate } from 'react-router-dom';

const { getWishlist, addWishlist, deleteWishlist } = new ManageWishlistApi();
const fetchWishlist = (userID) => () => getWishlist(userID);

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

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
      // Save the intended action and redirect to login
      navigate(`/login?redirect=add_to_wishlist&product_id=${data.id}`);
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
        {data?.new_arrival === 1 ? (
          <span className="product-label label-new">New</span>
        ) : data?.best_product === 1 ? (
          <span className="product-label label-top">Best</span>
        ) : (
          <></>
        )}
        {data?.sizes !== null && data?.sizes?.[0]?.offer_price !== 0 && (
          <span className="product-label label-out">Deal</span>
        )}
        <a href={"/product/" + data?.slug}>
          <img
            src={data?.image || "https://placehold.co/244x353"}
            alt={data?.name}
            className="product-image"
          />
        </a>
        <div className="product-action-vertical">
          {checkWishslistExists(data?.id) ? (
            <button
              className="btn-product-icon btn-wishlist btn-product-icon-active"
              onClick={() => {
                handleRemoveWishlist(data);
              }}
            >
              <IonIcon icon={heartDislike} size="1.5em" />
              {/* <HeartIcon currentColor="#da627d"/> */}
              <span>View wishlist</span>
            </button>
          ) : (
            <button
              className="btn-product-icon btn-wishlist"
              onClick={() => handleAddToWishlist(data)}
            >
              <IonIcon icon={heartOutline} size="1.5em" />
              {/* <HeartIcon currentColor="#000"/> */}
              <span>Add to wishlist</span>
            </button>
          )}
        </div>
      </figure>

      <div className="product-body">
        <h3 className="product-title">
          <a href={"/product/" + data?.slug}>{data?.name}</a>
        </h3>
        {data?.sizes !== null && data?.sizes?.[0]?.offer_price !== 0 ? (
          <div className="product-price product-price-red">
            Nok {data?.sizes?.[0]?.offer_price}
            <p className="product-orgprice">
              Original:{" "}
              <span className="product-orgprice-strike">
                Nok {data?.sizes?.[0]?.product_price}
              </span>
              &nbsp;
              <span className="product-offer-percentage">
                -
                {`${calculateDiscountPercentage(
                  data?.sizes?.[0]?.product_price,
                  data?.sizes?.[0]?.offer_price
                ).toFixed(0)}%`}
              </span>
            </p>
          </div>
        ) : (
          <div className="product-price">
            Nok {data?.sizes?.[0]?.product_price}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
