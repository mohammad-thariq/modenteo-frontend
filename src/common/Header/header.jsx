import React, { useEffect, useState } from "react";
import { Social } from "../Social/social";
import { IonIcon } from "@ionic/react";
import {
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
import {
  ManageCategoriesApi,
  ManageCartApi,
  ManageWishlistApi,
} from "../../service";
import { useQuery } from "react-query";

const { getCart } = new ManageCartApi();
const { getWishlist } = new ManageWishlistApi();
const fetchCart = (userID) => () => getCart(userID);
const fetchWishlist = (userID) => () => getWishlist(userID);

const WebsiteHeader = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [ismobileMenu, setIsMobileMenu] = useState(false);

  const userToken = LocalStorageHelper.getItem(localStorageConst.JWTUSER);
  const userDetails = LocalStorageHelper.getItem(localStorageConst.USER);
  const isLoggedIn = !!userToken;

  const { productMenuCategory, productMenuNew, productMenuSeasons } = new ManageCategoriesApi();
  const { data } = useQuery("menu-categories", productMenuCategory);
  const { data: seasons } = useQuery("menu-seasons", productMenuSeasons);
  const { data: newCollections } = useQuery("menu-new-collections", productMenuNew);
  const { data: cartData } = useQuery("cart", fetchCart(userDetails?.id), {
    enabled: !!userDetails,
  });
  const { data: wishlistData } = useQuery("wishlist", fetchWishlist(userDetails?.id), {
    enabled: !!userDetails,
  });

  const [categories, setCategories] = useState([]);
  const [seasonCollections, setSeasonalCollections] = useState([]);
  const [newCollectionsMenu, setNewCollections] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [guestCartItems, setGuestCartItems] = useState([]);

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
    const guestCart = LocalStorageHelper.getItem(localStorageConst.GUEST_CART) || [];
    setGuestCartItems(guestCart);
  }, []);

  const toggleAccordion = (id) => {
    setCategories(
      categories.map((acc) => (acc.id === id ? { ...acc, isOpen: !acc.isOpen } : { ...acc, isOpen: false }))
    );
  };

  const totalCartItems = cartItems.length + guestCartItems.length; // Combine user and guest cart items

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
        navigate("/cart");
      }}
    >
      <IonIcon icon={bagHandleOutline} />
      <span className="count">{totalCartItems}</span> {/* Display combined cart count */}
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
            {wishlistBtn}
            {cartBtn}
            {personOutlineBtn}
          </div>
        </div>
      </div>
      <nav
        id="myHeader"
        className={isSticky ? "desktop-navigation-menu sticky" : "desktop-navigation-menu"}
      >
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category">
              <a href="/" className="menu-title">Home</a>
            </li>
            {categories.length > 0 &&
              categories.map((cat, key) => (
                <li key={key} className="menu-category">
                  <a className="menu-title" href={"/category/" + cat?.categorySlug}>{cat?.categoryName}</a>
                  <ul className="dropdown-list">
                    {cat?.subCategory.map((subcat, key) => (
                      <li className="dropdown-item" key={key + 1}>
                        <a href={"/category/" + cat?.categorySlug + "/" + subcat?.slug}>{subcat?.name}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            <li className="menu-category">
              <a href="/new" className="menu-title">New</a>
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
              <a href="/seasons" className="menu-title">Season</a>
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
        <button className="action-btn" onClick={() => setIsMobileMenu(!ismobileMenu)}>
          <IonIcon icon={menuOutline} />
        </button>
        {cartBtn}
        {wishlistBtn}
        {personOutlineBtn}
      </div>
      <nav className={ismobileMenu ? "mobile-navigation-menu has-scrollbar active" : "mobile-navigation-menu has-scrollbar"}>
        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>
          <button className="menu-close-btn" onClick={() => setIsMobileMenu(!ismobileMenu)}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <a href="/" className="menu-title">Home</a>
          </li>
          {categories.length > 0 &&
            categories.map((cat) => (
              <li key={cat?.id} className="menu-category">
                <button className={cat?.isOpen ? "accordion-menu active" : "accordion-menu"}>
                  <a href={"/category/" + cat?.categorySlug}>
                    <p className="menu-title">{cat?.categoryName}</p>
                  </a>
                  <div onClick={() => toggleAccordion(cat?.id)}>
                    <IonIcon className="add-icon" icon={addOutline} />
                    <IonIcon className="remove-icon" icon={removeOutline} />
                  </div>
                </button>
                {cat?.subCategory.length > 0 && (
                  <ul className={cat?.isOpen ? "submenu-category-list active" : "submenu-category-list"}>
                    {cat?.subCategory.map((subcat, index) => (
                      <li key={index} className="submenu-category">
                        <a href={"/category/" + cat?.categorySlug + "/" + subcat?.slug} className="submenu-title">
                          {subcat?.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          <li className="menu-category">
            <a href="/new" className="menu-title">New</a>
          </li>
          <li className="menu-category">
            <a href="/seasons" className="menu-title">Seasons</a>
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
