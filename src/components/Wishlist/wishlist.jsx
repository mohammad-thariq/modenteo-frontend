import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { Breadcrumb, PageTitle } from "../../common";
import {
  cartOutline,
  closeOutline,
  logoFacebook,
  logoTwitter,
  logoInstagram,
  logoYoutube,
  logoWhatsapp,
  heartDislikeOutline,
  refreshOutline,
} from "ionicons/icons";
import { useMutation, useQuery } from "react-query";
import { ToastifyFailed, ToastifySuccess } from "../../common/Toastify";
import "../../styles/wishlist.css";
import { ManageWishlistApi, ManageCartApi } from "../../service";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { Redirect } from "../../helper/base";
const { getWishlist, deleteWishlist } = new ManageWishlistApi();
const fetchWishlist = (userID) => () => getWishlist(userID);
const { getCart, addCart } = new ManageCartApi();

const fetchCart = (userID) => () => getCart(userID);

const Wishlist = () => {
  let userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const { data: cartData, refetch } = useQuery(
    "cart",
    fetchCart(userDetails?.id),
    { enabled: userDetails != null ? true : false }
  );

  const { data: wishlistData, refetch: refetchWishlist } = useQuery(
    "wishlist",
    fetchWishlist(userDetails?.id),
    { enabled: userDetails != null ? true : false }
  );
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (wishlistData?.data && Array.isArray(wishlistData?.data)) {
      setWishlistItems(wishlistData?.data);
    }
  }, [wishlistData]);

  const { mutate: createCart } = useMutation(addCart, {
    onSuccess: () => {
      ToastifySuccess("Product Added to Cart");
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
  const handleAddToCart = (id) => {
    if (userDetails) {
      let cartData = { product_id: id, user_id: userDetails?.id, quantity: 1 };
      createCart(cartData);
    } else {
      ToastifyFailed("Please log in to add products to your cart");
    }
  };

  const handleRemove = (id) => {
    removeWishlist(id);
  };
  function checkCartExists(productId) {
    if (cartData?.data !== undefined) {
      return cartData?.data.some((item) => item.product_id === productId);
    } else {
      return false;
    }
  }

  return (
    <>
      <PageTitle title="Wishlist" />
      <div className="cart page-content">
        <Breadcrumb />
        <div className="container">
          {wishlistItems.length > 0 ? (
            <>
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
                            <Link to={"/product/" + item?.slug}>
                              <img src={item.image} alt="Product" />
                            </Link>
                          </figure>
                          <h3 className="product-title">
                            <Link to={"/product/" + item?.slug}>
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                      </td>
                      <td className="price-col">
                        $
                        {item.offer_price <= 0
                          ? item.price.toFixed(2)
                          : item.offer_price.toFixed(2)}
                      </td>
                      <td className="stock-col">
                        <span
                          className={
                            item.stock_quantity > 0
                              ? "in-stock"
                              : "out-of-stock"
                          }
                        >
                          {item.stock_quantity > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="action-col">
                        {item.stock_quantity > 0 ? (
                          checkCartExists(item?.product_id) ? (
                            <button
                              className="btn btn-cart btn-block btn-outline-primary-2"
                              onClick={() => Redirect("/cart")}
                            >
                              <IonIcon icon={cartOutline} /> View Cart
                            </button>
                          ) : (
                            <button
                              className="btn btn-cart btn-block btn-outline-primary-2"
                              onClick={() => handleAddToCart(item.product_id)}
                            >
                              <IonIcon icon={cartOutline} /> Add to Cart
                            </button>
                          )
                        ) : (
                          <button className="btn btn-cart btn-block btn-outline-primary-2 disabled">
                            Out of Stock
                          </button>
                        )}
                      </td>
                      <td className="remove-col">
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(item.id)}
                        >
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
                  <div className="social-links">
                    <Link
                      to="#"
                      className="social-icon"
                      title="Facebook"
                      target="_blank"
                    >
                      <IonIcon icon={logoFacebook} />
                    </Link>
                    <Link
                      to="#"
                      className="social-icon"
                      title="Twitter"
                      target="_blank"
                    >
                      <IonIcon icon={logoTwitter} />
                    </Link>
                    <Link
                      to="#"
                      className="social-icon"
                      title="Instagram"
                      target="_blank"
                    >
                      <IonIcon icon={logoInstagram} />
                    </Link>
                    <Link
                      to="#"
                      className="social-icon"
                      title="YouTube"
                      target="_blank"
                    >
                      <IonIcon icon={logoYoutube} />
                    </Link>
                    <Link
                      to="#"
                      className="social-icon"
                      title="WhatsApp"
                      target="_blank"
                    >
                      <IonIcon icon={logoWhatsapp} />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <IonIcon icon={heartDislikeOutline} size="large" />
              <p>No items in your wishlist</p>
              <Link
                to="/"
                className="continue-shopping btn btn-outline-dark-2 btn-block mb-3"
              >
                <span>CONTINUE SHOPPING</span>
                <IonIcon icon={refreshOutline} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
