import React, { useEffect, useState } from "react";
import ProductDetailsFooter from "./product-footer";
import { IonIcon } from "@ionic/react";
import {
  heartOutline,
  cartOutline,
  heartDislike,
  bagAddSharp,
} from "ionicons/icons";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import {
  ManageBrandsApi,
  ManageCartApi,
  ManageCategoriesApi,
  ManageWishlistApi,
} from "../../service";
import { useMutation, useQuery } from "react-query";
import { Loading } from "../../common";
import ProductDetailsTab from "./product-details-tab";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ data }) => {
  const [qty, setQty] = useState(1);
  const [existingCart, setExistingCart] = useState([]);
  const navigate = useNavigate();
  const userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const { addCart, getCart, updateCart } = new ManageCartApi();
  const { getBrandById } = new ManageBrandsApi();
  const { getSubCategoryById } = new ManageCategoriesApi();
  const { addWishlist, deleteWishlist, getWishlist } = new ManageWishlistApi();

  const {
    data: cartData,
    isLoading,
    refetch,
  } = useQuery("cart", () => getCart(userDetails?.id), {
    enabled: !!userDetails,
  });

  const {
    data: wishlistData,
    isLoading: isLoadingWishlist,
    refetch: refetchWishlist,
  } = useQuery("wishlist", () => getWishlist(userDetails?.id), {
    enabled: !!userDetails,
  });

  const { data: productBrand } = useQuery(
    ["product-brand", data.brand_id],
    getBrandById,
    {
      enabled: !!data?.brand_id,
    }
  );

  const { data: productSubCategory } = useQuery(
    ["product-sub-category", data.sub_category_id],
    getSubCategoryById,
    {
      enabled: !!data?.sub_category_id,
    }
  );

  useEffect(() => {
    if (cartData) {
      const checkCartExists = (id) => {
        return cartData?.data
          ? cartData.data.filter((item) => item.product_id === id)
          : [];
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
    const getWishlistItem = wishlistData?.data.find(
      (item) => item.product_id === data?.id && item.user_id === userDetails?.id
    );
    if (getWishlistItem) {
      removeWishlist(getWishlistItem.id);
    }
  };

  const handleUpdateToCart = (id) => {
    cartUpdate({ id, quantity: qty });
  };

  const handleAddToCart = () => {
    if (userDetails) {
      const cartData = {
        product_id: data.id,
        user_id: userDetails?.id,
        quantity: qty,
      };
      createCart(cartData);
    } else {
      ToastifyFailed("Please log in to add products to your cart");
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
      ToastifyFailed("Please log in to add products to your wishlist");
    }
  };

  const checkWishlistExists = (productId) => {
    return wishlistData?.data
      ? wishlistData.data.some(
          (item) =>
            item.product_id === productId && item.user_id === userDetails?.id
        )
      : false;
  };
  
  return (
    <div className="col-md-6 mt-4">
      <div className="product-detailds">
        {productBrand && (
          <p className="product-brand">{productBrand?.brand?.name}</p>
        )}
        <p className="product-name">{data?.name}</p>
        <div className="product-indprice">
          $ {data?.price} <span>including VAT.</span>
        </div>

        <div className="details-filter-row details-row-size">
          <div className="product-details-quantity">
            <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <p className="product-details-qnty-item">{productSubCategory && productSubCategory?.data?.name}</p>
          </div>
          <div className="product-details-policy" title="Shipping and Return Policy" onClick={() => navigate('/page/delivery')}>
            <IonIcon icon={bagAddSharp} />
          </div>
        </div>

        {isLoading || isLoadingWishlist ? (
          <Loading />
        ) : (
          <div className="product-details-action cart-screen">
            {existingCart.length > 0 ? (
              <span
                onClick={() => handleUpdateToCart(existingCart[0].id)}
                className="btn-product btn-cart"
              >
                <IonIcon icon={cartOutline} />
                &nbsp;
                <span>Update Cart</span>
              </span>
            ) : (
              <span onClick={handleAddToCart} className="btn-product btn-cart">
                <IonIcon icon={cartOutline} />
                &nbsp;
                <span>Add to Cart</span>
              </span>
            )}
            {checkWishlistExists(data?.id) ? (
              <span
                onClick={handleRemoveWishlist}
                className="btn-product btn-wishlist"
                title="Wishlist"
              >
                <IonIcon icon={heartDislike} />
                &nbsp;
                <span>Remove Wishlist</span>
              </span>
            ) : (
              <span
                onClick={handleAddToWishlist}
                className="btn-product btn-wishlist"
                title="Wishlist"
              >
                <IonIcon icon={heartOutline} />
                &nbsp;
                <span>Add to Wishlist</span>
              </span>
            )}
          </div>
        )}
      </div>
      <ProductDetailsTab data={data}/>
      <ProductDetailsFooter product={data} />
    </div>
  );
};

export default ProductDetails;
