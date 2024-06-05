import React, { useEffect, useState } from "react";
import { Social } from "../Social/social";
import { IonIcon } from "@ionic/react";
import {
  searchOutline,
  personOutline,
  heartOutline,
  bagHandleOutline,
  closeOutline,
  menuOutline,
  addOutline,
  removeOutline,
} from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { ManageCategoriesApi, ManageCartApi, ManageWishlistApi } from "../../service";
import { useQuery } from "react-query";
const { getCart } = new ManageCartApi();
const { getWishlist } = new ManageWishlistApi();
const fetchCart = (userID) => () => getCart(userID);
const fetchWishlist = (userID) => () => getWishlist(userID);
const WebsiteHeader = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  let userToken = LocalStorageHelper?.getItem(localStorageConst?.JWTUSER);
  let userDetails = LocalStorageHelper?.getItem(localStorageConst?.USER);
  const isLoggedIn = userToken ? true : false;
  const [ismobileMenu, setismobileMenu] = useState(false);
  const { productMenuCategory, productMenuNew, productMenuSeasons } = new ManageCategoriesApi();
  const { data } = useQuery("menu-categories", productMenuCategory);
  const { data: seasons } = useQuery("menu-seasons", productMenuSeasons);
  const { data: newCollections } = useQuery(
    "menu-new-collections",
    productMenuNew
  );
  const [categories, setcategories] = useState([]);
  const [seasoncollections, setSeasonalCollections] = useState([]);
  const [newcollectionsmenu, setNewCollections] = useState([]);
  const { data: cartData } = useQuery('cart', fetchCart(userDetails?.id),{ enabled: userDetails != null ? true : false });
  const { data: wishlistData } = useQuery('wishlist', fetchWishlist(userDetails?.id), { enabled: userDetails != null ? true : false });


  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setwishlistItems] = useState([]);

  useEffect(() => {
    if (cartData?.data && Array.isArray(cartData?.data)) {
      setCartItems(cartData?.data);
    }
    if (wishlistData?.data && Array.isArray(wishlistData?.data)) {
      setwishlistItems(wishlistData?.data);
    }
  }, [cartData, wishlistData])

  useEffect(() => {
    if (data && data.response && Array.isArray(data.response)) {
      setcategories(data?.response);
    }

    if (seasons && seasons.response && Array.isArray(seasons.response)) {
      setSeasonalCollections(seasons?.response);
    }
    if (
      newCollections &&
      newCollections.response &&
      Array.isArray(newCollections.response)
    ) {
      setNewCollections(newCollections?.response);
    }
  }, [data, seasons, newCollections]);

  const toggleAccordion = (id) => {
    setcategories(
      categories.map((acc) => {
        if (acc.id === id) {
          return { ...acc, isOpen: !acc.isOpen };
        }
        return { ...acc, isOpen: false };
      })
    );
  };

  const wishlistBtn = (
    <button
      className="action-btn"
      onClick={() => {
        isLoggedIn ? navigate("/wishlist") : navigate("/login");
      }}
    >
      <IonIcon icon={heartOutline} />
      <span className="count">{wishlistItems.length}</span>
    </button>
  );
  const searchBtn = (
    <div className="header-search-container">
      <input
        type="search"
        name="search"
        className="search-field"
        placeholder="Enter your product name..."
      />
      <button className="search-btn">
        <IonIcon icon={searchOutline} />
      </button>
    </div>
  );
  const personOutlineBtn = (
    <button
      className="action-btn"
      onClick={() => {
        isLoggedIn ? navigate("/dashboard") : navigate("/login");
      }}
    >
      <IonIcon icon={personOutline} />
    </button>
  );
  const cartBtn = (
    <button
      className="action-btn"
      onClick={() => {
        isLoggedIn ? navigate("/cart") : navigate("/login");
      }}
    >
      <IonIcon icon={bagHandleOutline} />
      <span className="count">{cartItems.length}</span>
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
      {/* <div className="header-top">
        <div className="container">
          <ul className="header-social-container">
            <Social />
          </ul>
          <div className="header-alert-news">
            <p><b>Follow Us </b> and get a chance to win 80% off </p>
          </div>
          <ul className="header-social-container contactSec">
            <li>
              <a href="/" className="social-link">
                <IonIcon icon={callOutline} />
              </a>
              <span>987654321</span>
            </li>
            <li>
              <a href="/" className="social-link">
                <IonIcon icon={mailOutline} />
              </a>
              <span>modento@gmail.com</span>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="header-main">
        <div className="container">
          <a href="/" className="header-logo">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/modenteologo.jpeg"}
              alt="Modenteo"
              width="180"
              height="36"
            />
          </a>
          <div className="header-user-actions">
            {searchBtn}
            {wishlistBtn}
            {cartBtn}
            {personOutlineBtn}
          </div>
        </div>
      </div>
      <nav
        id="myHeader"
        className={
          isSticky
            ? "desktop-navigation-menu sticky"
            : "desktop-navigation-menu"
        }
      >
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category">
              <a href="/" className="menu-title">
                Home
              </a>
            </li>
            <li className="menu-category">
              <a href="/categories" className="menu-title">
                Categories
              </a>
            </li>
            {categories.length > 0 &&
              categories.map((cat) => {
                return (
                  <li className="menu-category">
                    <a
                      className="menu-title"
                      href={"/category/" + cat?.categorySlug}
                    >
                      {cat?.categoryName}
                    </a>
                    <ul className="dropdown-list">
                      {cat?.subCategory.map((subcat, key) => {
                        return (
                          <li className="dropdown-item" key={key + 1}>
                            <a
                              href={
                                "/category/" +
                                cat?.categorySlug +
                                "/" +
                                subcat?.slug
                              }
                            >
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
              {newcollectionsmenu.length > 0 && (
                <ul className="dropdown-list">
                  {newcollectionsmenu.length > 0 &&
                    newcollectionsmenu.map((menu, key) => {
                      return (
                        <li className="dropdown-item" key={key + 1}>
                          <a href={"/new/" + menu?.slug}>{menu?.name}</a>
                        </li>
                      );
                    })}
                </ul>
              )}
            </li>
            <li className="menu-category">
              <a href="/seasons" className="menu-title">
                Season
              </a>
              {seasoncollections.length > 0 && (
                <ul className="dropdown-list">
                  {seasoncollections.length > 0 &&
                    seasoncollections.map((menu, key) => {
                      return (
                        <li className="dropdown-item" key={key + 1}>
                          <a href={"/collection/" + menu?.slug}>{menu?.name}</a>
                        </li>
                      );
                    })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="mobile-bottom-navigation">
        <button
          className="action-btn"
          onClick={() => setismobileMenu(!ismobileMenu)}
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
          <h2 className="menu-title">Menu</h2>
          <button
            className="menu-close-btn"
            onClick={() => setismobileMenu(!ismobileMenu)}
          >
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <a href="/" className="menu-title">
              Home
            </a>
          </li>
          <li className="menu-category">
            <a href="/categories" className="menu-title">
              Categories
            </a>
          </li>
          {categories.length > 0 &&
            categories.map((cat) => {
              return (
                <li key={cat?.id} className="menu-category">
                  <button
                    className={
                      cat?.isOpen ? "accordion-menu active" : "accordion-menu"
                    }
                    onClick={() => toggleAccordion(cat?.id)}
                  >
                    <p className="menu-title">{cat?.categoryName}</p>
                    <div>
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
                      {cat?.subCategory.map((subcat, index) => {
                        return (
                          <li key={index} className="submenu-category">
                            <a href="/" className="submenu-title">
                              {subcat?.name}
                            </a>
                          </li>
                        );
                      })}
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
