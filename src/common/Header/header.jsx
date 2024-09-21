/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Social } from "../Social/social";
import { IonIcon } from "@ionic/react";
import {
  closeOutline,
  menuOutline,
  addOutline,
  removeOutline,
} from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import {
  ManageCategoriesApi,
  ManageCartApi,
  ManageWishlistApi,
} from "../../service";
import { useQuery } from "react-query";
import { ProfileIcon } from "../illustration/profile";
import { HeartIcon } from "../illustration/heart";
import { BagIcon } from "../illustration/bag";
import "../../styles/header.css";
import { BagAddedIcon } from "../illustration/bagAdded";

const { getCart } = new ManageCartApi();
const { getWishlist } = new ManageWishlistApi();
const fetchCart = (userID) => () => getCart(userID);
const fetchWishlist = (userID) => () => getWishlist(userID);

const WebsiteHeader = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [ismobileMenu, setIsMobileMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const userToken = LocalStorageHelper.getItem(localStorageConst.JWTUSER);
  const userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const userSelectedCategory = LocalStorageHelper.getItem(
    localStorageConst.CURRENT_PAGE
  );
  const isLoggedIn = !!userToken;

  const { productMenuCategory, productMenuNew, productMenuSeasons } =
    new ManageCategoriesApi();
  const { data } = useQuery("menu-categories", productMenuCategory);
  const { data: seasons } = useQuery("menu-seasons", productMenuSeasons);
  const { data: newCollections } = useQuery(
    "menu-new-collections",
    productMenuNew
  );
  const { data: cartData } = useQuery("cart", fetchCart(userDetails?.id), {
    enabled: !!userDetails,
  });
  const { data: wishlistData } = useQuery(
    "wishlist",
    fetchWishlist(userDetails?.id),
    {
      enabled: !!userDetails,
    }
  );

  const [categories, setCategories] = useState([]);
  const [seasonCollections, setSeasonalCollections] = useState([]);
  const [newCollectionsMenu, setNewCollections] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [guestCartItems, setGuestCartItems] = useState([]);

  const handleCategoryLocal = useCallback(
    (currentPage) => {
      LocalStorageHelper.setItem(localStorageConst.CURRENT_PAGE, currentPage);
      navigate(`/home-${currentPage.toLowerCase()}`);
    },
    [navigate]
  );

  // useEffect(() => {
  //   if(userSelectedCategory === null){
  //     LocalStorageHelper.setItem(localStorageConst.CURRENT_PAGE, "Mens")
  //     navigate("/home-mens")
  //   }
  // }, [navigate, userSelectedCategory])

  const handleRemoveCategoryLocal = () => {
    LocalStorageHelper.removeItem(localStorageConst.CURRENT_PAGE);
    navigate("/");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    handleRemoveCategoryLocal();
  };

  useEffect(() => {
    if (cartData?.data && Array.isArray(cartData?.data)) {
      setCartItems(cartData?.data);
    }
    if (wishlistData?.data && Array.isArray(wishlistData?.data)) {
      setWishlistItems(wishlistData?.data);
    }
  }, [cartData, wishlistData]);

  useEffect(() => {
    if (data?.response && Array.isArray(data.response)) {
      setCategories(data?.response);
    }
    if (seasons?.response && Array.isArray(seasons.response)) {
      setSeasonalCollections(seasons?.response);
    }
    if (newCollections?.response && Array.isArray(newCollections.response)) {
      setNewCollections(newCollections?.response);
    }
  }, [data, seasons, newCollections]);

  useEffect(() => {
    const guestCart =
      LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
    setGuestCartItems(guestCart);
  }, []);

  const toggleAccordion = (id) => {
    setCategories(
      categories.map((acc) =>
        acc.id === id
          ? { ...acc, isOpen: !acc.isOpen }
          : { ...acc, isOpen: false }
      )
    );
  };
  const personOutlineBtn = (
    <button
      className="action-btn"
      onClick={() => {
        isLoggedIn ? navigate("/dashboard") : navigate("/login");
      }}
    >
      <ProfileIcon />
    </button>
  );
  const MiniCart = ({ items }) => {
    // Calculate total price
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    return (
      <div className="minicart">
        {items.length > 0 ? (
          <div className="minicart-items">
            {items.map((item, index) => (
              <div key={index} className="minicart-item">
                <img src={item.image} alt={item.name} className="minicart-item-image" />
                <div className="minicart-item-details">
                  <p className="minicart-item-name">{item.name}</p>
                  <p className="minicart-item-price">{item.price} NOK x {item.quantity}</p> {/* Updated to show NOK */}
                </div>
              </div>
            ))}
  
            {/* Total price */}
            <div className="minicart-total">
              <p>Total: <span className="total-price">{totalPrice.toFixed(2)} NOK</span></p> {/* Updated to show NOK */}
            </div>
  
            {/* "Go to Cart" button */}
            {/* <button onClick={() => navigate('/cart')} className="goto-cart-button">
              Go to Cart
            </button> */}
          </div>
        ) : (
          <div className="empty-cart">Your cart is empty</div>
        )}
      </div>
    );
  };
  


  // const totalCartItems = cartItems.length + guestCartItems.length; // Combine user and guest cart items

  const wishlistBtn = (
    <button
      className="action-btn"
      onClick={() => {
        isLoggedIn ? navigate("/wishlist") : navigate("/login");
      }}
    >
      {/* <IonIcon icon={heartOutline} /> */}
      <HeartIcon />
      <span className="count">{wishlistItems.length}</span>
    </button>
  );
  // const searchBtn = (
  //   <div className="header-search-container">
  //     <input
  //       type="search"
  //       name="search"
  //       className="search-field"
  //       placeholder="Enter your product name..."
  //     />
  //     <button className="search-btn">
  //       <IonIcon icon={searchOutline} />
  //     </button>
  //   </div>
  // );

  const cartBtn = (
    <button
      className="action-btn"
      onClick={() => {
        navigate("/cart");
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {guestCartItems.length !== 0 || cartItems.length !== 0 ? (
        <BagAddedIcon />
      ) : (
        <BagIcon />
      )}
      <span className="count">{guestCartItems.length || cartItems.length}</span>
      {isHovered && <MiniCart items={cartItems.length<=0 ? guestCartItems : cartItems} />} 
    </button>
  );

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;

    const handleScroll = () => {
      if (window.pageYOffset > sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="header-offer-line">
        <div className="container">
          <div className="header-offer-line-flex">
            <span>All your fovorite brands</span>
            <span>100 days open purchase</span>
            <span>free shipping on standard shipments over NOK 449*</span>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="container">
          <div className="header-button-wrapper">
            {categories?.map((cate, key) => (
              <p
                onClick={() => handleCategoryLocal(cate?.categoryName)}
                className={
                  userSelectedCategory === cate?.categoryName
                    ? "header-button-text-active"
                    : "header-button-text"
                }
                key={key}
              >
                {cate?.categoryName}
              </p>
            ))}
          </div>
          <a href="/" className="header-logo" onClick={handleHomeClick}>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/modenteologo.jpeg"}
              alt="Modenteo"
              width="180"
              height="36"
            />
          </a>
          <div className="header-user-actions">
            {/* {searchBtn} */}
            {personOutlineBtn}
            {wishlistBtn}
            {cartBtn}
          </div>
        </div>
      </div>
      <nav id="myHeader" className="desktop-navigation-menu">
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category">
              <a href="/" className="menu-title" onClick={handleHomeClick}>
                Home
              </a>
            </li>
            {categories.length > 0 &&
              categories
                .filter((cat) => cat?.categoryName === userSelectedCategory)
                .map((cat, key) => {
                  return (
                    <li key={key} className="menu-category">
                      <a
                        className="menu-title"
                        href={"/category/" + cat?.categorySlug}
                      >
                        Clothing
                      </a>
                      <ul className="dropdown-list">
                        {cat?.subCategory.map((subcat, subKey) => {
                          return (
                            <li className="dropdown-item" key={subKey}>
                              <a
                                className="dropdown-item-flex"
                                href={
                                  "/category/" +
                                  cat?.categorySlug +
                                  "/" +
                                  subcat?.slug
                                }
                              >
                                <span>
                                  <img
                                    className="item-image"
                                    src={`/assets/icons/menuProductIcons/${subcat?.slug}.png`}
                                    alt={subcat?.name}
                                  />
                                </span>
                                {subcat?.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}

            <li className="menu-category">
              <a href="/new" className="menu-title">
                New
              </a>
              {newCollectionsMenu.length > 0 && (
                <ul className="dropdown-list">
                  {newCollectionsMenu.map((menu, key) => (
                    <li className="dropdown-item" key={key + 1}>
                      <a href={"/products?slug=" + menu?.slug}>{menu?.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="menu-category">
              <a href="/seasons" className="menu-title">
                Season
              </a>
              {seasonCollections.length > 0 && (
                <ul className="dropdown-list">
                  {seasonCollections.map((menu, key) => (
                    <li className="dropdown-item" key={key + 1}>
                      <a href={"/products?slug=" + menu?.slug}>{menu?.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="mobile-bottom-navigation">
        <button
          className="action-btn"
          onClick={() => setIsMobileMenu(!ismobileMenu)}
        >
          <IonIcon icon={menuOutline} />
        </button>
        {cartBtn}
        {wishlistBtn}
        {personOutlineBtn}
      </div>
      <nav
        className={
          ismobileMenu
            ? "mobile-navigation-menu has-scrollbar active"
            : "mobile-navigation-menu has-scrollbar"
        }
      >
        <div className="menu-top">
          <h2 className="menu-title">Select By Category</h2>
          <button
            className="menu-close-btn"
            onClick={() => setIsMobileMenu(!ismobileMenu)}
          >
            <IonIcon icon={closeOutline} />
          </button>
        </div>
        <div className="mobile-header-button-wrapper">
          {categories?.map((cate, key) => (
            <p
              className={
                userSelectedCategory === cate?.categoryName
                  ? "mobile-header-button-text-active"
                  : "mobile-header-button-text"
              }
              key={key}
              onClick={() => handleCategoryLocal(cate?.categoryName)}
            >
              {cate?.categoryName}
            </p>
          ))}
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <a href="/" className="menu-title" onClick={handleHomeClick}>
              Home
            </a>
          </li>
          {categories.length > 0 &&
            categories
              .filter((cat) => cat?.categoryName === userSelectedCategory)
              .map((cat, key) => {
                return (
                  <li key={key} className="menu-category">
                    <button
                      className={
                        cat?.isOpen ? "accordion-menu active" : "accordion-menu"
                      }
                    >
                      <a href={"/category/" + cat?.categorySlug}>
                        <p className="menu-title">Clothing</p>
                      </a>
                      <div onClick={() => toggleAccordion(cat?.id)}>
                        <IonIcon className="add-icon" icon={addOutline} />
                        <IonIcon className="remove-icon" icon={removeOutline} />
                      </div>
                    </button>
                    {cat?.subCategory.length > 0 && (
                      <ul
                        className={
                          cat?.isOpen
                            ? "submenu-category-list active"
                            : "submenu-category-list"
                        }
                      >
                        {cat?.subCategory.map((subcat, index) => (
                          <li key={index} className="submenu-category">
                            <a
                              href={
                                "/category/" +
                                cat?.categorySlug +
                                "/" +
                                subcat?.slug
                              }
                              className="submenu-title"
                            >
                              <span>
                                <img
                                  className="item-image"
                                  src={`/assets/icons/menuProductIcons/${subcat?.slug}.png`}
                                  alt={subcat?.name}
                                />
                              </span>
                              {subcat?.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
          <li className="menu-category">
            <a href="/new" className="menu-title">
              New
            </a>
          </li>
          <li className="menu-category">
            <a href="/seasons" className="menu-title">
              Seasons
            </a>
          </li>
        </ul>
        <div className="menu-bottom">
          <ul className="menu-social-container">
            <Social />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default WebsiteHeader;
