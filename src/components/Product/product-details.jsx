import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductDetailsFooter from "./product-footer";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import {
  ManageBrandsApi,
  ManageCartApi,
  // ManageCategoriesApi,
  ManageWishlistApi,
} from "../../service";
import { useMutation, useQuery } from "react-query";
import { Loading } from "../../common";
import ProductDetailsTab from "./product-details-tab";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { calculateDiscountPercentage } from "../../utils/percentageCal";
import { productSizecustomStyles } from "../FilterPanel/style";

const ProductDetails = ({ data, sizes, variants, setproductVariantMainImage }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [existingCart, setExistingCart] = useState([]);
  const [currentColor, setCurrentColor] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [currentOfferPrice, setCurrentOfferPrice] = useState();
  const [currentProductQuantity, setCurrentProductQuantity] = useState();
  const userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const { addCart, getCart, updateCart } = new ManageCartApi();
  const { getBrandById } = new ManageBrandsApi();
  // const { getSubCategoryById } = new ManageCategoriesApi();
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

  // const { data: productSubCategory } = useQuery(
  //   ["product-sub-category", data.sub_category_id],
  //   getSubCategoryById,
  //   {
  //     enabled: !!data?.sub_category_id,
  //   }
  // );

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

  const { mutate: createCart } = useMutation(addCart, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Cart");
      refetch();
    },
    onError: (error) => {
      ToastifyFailed(error?.message);
    },
  });

  const { mutate: createWishlist } = useMutation(addWishlist, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Wishlist");
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
    if (userDetails) {
      cartUpdate({ id, quantity: qty });
    } else {
      // Update guest cart in local storage
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      const updatedCart = guestCart.map((item) =>
        item.product_id === id ? { ...item, quantity: qty } : item
      );
      LocalStorageHelper.setItem(localStorageConst.GUEST_CART, updatedCart);
      ToastifySuccess("Quantity Updated in Guest Cart");
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      product_id: data.id,
      brand_id: data.brand_id,
      quantity: currentProductQuantity,
      image: data.image,
      slug: data.slug,
      name: data.name,
      size: currentSize,
      color: currentColor,
      user_id: userDetails?.id,
    };

    if (userDetails) {
      const existingItem = cartData?.data?.find(
        (item) => item.product_id === data.id
      );

      if (existingItem) {
        // Update quantity if item exists
        handleUpdateToCart(data.id);
      } else {
        // Add new item to user cart
        createCart(cartItem);
      }
    } else {
      // For guest users, handle cart logic in local storage
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      const existingItem = guestCart.find(
        (item) => item.product_id === data.id
      );

      if (existingItem) {
        // Update quantity if item exists
        const updatedCart = guestCart.map((item) =>
          item.product_id === data.id ? { ...item, quantity: qty } : item
        );
        LocalStorageHelper.setItem(localStorageConst.GUEST_CART, updatedCart);
        ToastifySuccess("Quantity Updated in Guest Cart");
      } else {
        // Add new item to guest cart
        guestCart.push(cartItem);
        LocalStorageHelper.setItem(localStorageConst.GUEST_CART, guestCart);
        ToastifySuccess("Product Added to Guest Cart");
      }
    }
  };

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
    } else {
      // For guest users, check the local storage
      const guestCart =
        LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
      const guestCartItem = guestCart.find(
        (item) => item.product_id === data.id
      );
      if (guestCartItem) {
        setExistingCart([guestCartItem]);
        setQty(guestCartItem.quantity);
      }
    }
  }, [cartData, data?.id]);

  useEffect(() => {
    setCurrentColor(data?.color);
    if (sizes?.length !== 0) {
      setCurrentOfferPrice(sizes?.[0]?.offer_price);
      setCurrentPrice(sizes?.[0]?.product_price);
      setCurrentProductQuantity(sizes?.[0]?.product_quantity);
      setCurrentSize(sizes?.[0]?.product_size);
    }
  }, [data?.color, sizes, sizes?.length]);

  const ProductSizeData = useMemo(() => {
    if (Array.isArray(sizes)) {
      return sizes.map((size) => ({
        value: size.product_size,
        label: size.product_size,
        offer_price: size.offer_price,
        product_price: size.product_price,
        quantity: size.product_quantity,
      }));
    }
    return [];
  }, [sizes]);

  const handleChangeSize = useCallback((e) => {
    setCurrentSize(e?.value);
    setCurrentOfferPrice(e?.offer_price);
    setCurrentPrice(e?.product_price);
    setCurrentProductQuantity(e?.quantity);
  }, []);

  const handleThumbnailVariantClick = useCallback((image, color) => {
    setproductVariantMainImage(image)
      setCurrentColor(color);
  }, [setproductVariantMainImage]);

  const handleNavigateToVariants = (variantSlug) => {
    navigate(`/product/${variantSlug}`);
    window.location.reload();
  };

  return (
    <div className="col-md-6">
      <div className="product-detailds">
        {productBrand && (
          <p className="product-brand">{productBrand?.brand?.name}</p>
        )}
        <p className="product-name">{data?.name}</p>
        {currentOfferPrice !== 0 ? (
          <div className="product-offerprice">
            Nok {currentOfferPrice} <span>including VAT.</span>
            <p className="product-orgprice">
              Original:{" "}
              <span className="product-orgprice-strike">
                Nok {currentPrice}
              </span>
              &nbsp;
              <span className="product-offer-percentage">
                -
                {`${calculateDiscountPercentage(
                  currentPrice,
                  currentOfferPrice
                ).toFixed(0)}%`}
              </span>
            </p>
          </div>
        ) : (
          <div className="product-indprice">
            Nok {currentPrice} <span>including VAT.</span>
          </div>
        )}
        <div className="product-detail-variant-wrapper">
          <p className="product-detail-color">
            Colour: <span>{currentColor}</span>
          </p>
          {variants?.length !== 0 && (
            <div className="product-detail-variants">
              {Array.isArray(variants) &&
                variants.map((variant) => (
                  <img
                    className={
                      variant?.id === data?.id &&
                      "product-detail-variants-img-active"
                    }
                    onClick={() => handleNavigateToVariants(variant?.slug)}
                    onMouseOver={() =>
                      handleThumbnailVariantClick(variant?.image, variant?.color)
                    }
                    onMouseLeave={() =>
                      setCurrentColor(data?.color)
                    }
                    src={variant?.image}
                    alt={variant?.name}
                    key={variant?.id}
                  />
                ))}
            </div>
          )}
        </div>
        <div className="mb-2 product-details-quantity">
          <Select
            isSearchable={false}
            options={ProductSizeData}
            onChange={(e) => handleChangeSize(e)}
            placeholder="choose size"
            styles={productSizecustomStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "black",
                primary: "black",
              },
            })}
          />
          {/* <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            /> */}
        </div>

        {isLoading || isLoadingWishlist ? (
          <Loading />
        ) : (
          <div className="product-details-action cart-screen">
            {existingCart.length > 0 ? (
              <span
                onClick={() => handleUpdateToCart(existingCart[0].product_id)}
                className="btn-product btn-cart"
              >
                {/* <IonIcon icon={cartOutline} size="40px"/> */}
                &nbsp;
                <span>Update Cart</span>
              </span>
            ) : (
              <span onClick={handleAddToCart} className="btn-product btn-cart">
                {/* <IonIcon icon={cartOutline} /> */}
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
                {/* <IonIcon icon={heartDislike} /> */}
                &nbsp;
                <span>Remove Wishlist</span>
              </span>
            ) : (
              <span
                onClick={handleAddToWishlist}
                className="btn-product btn-wishlist"
                title="Wishlist"
              >
                {/* <IonIcon icon={heartOutline} /> */}
                &nbsp;
                <span>Add to Wishlist</span>
              </span>
            )}
          </div>
        )}
      </div>
      <ProductDetailsTab data={data} />
      <ProductDetailsFooter product={data} />
    </div>
  );
};

export default ProductDetails;
