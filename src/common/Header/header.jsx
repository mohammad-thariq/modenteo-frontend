import React, { useEffect, useState } from "react";
import { Social } from "../Social/social";
import { IonIcon } from "@ionic/react";
import { searchOutline, personOutline, heartOutline, bagHandleOutline, closeOutline, menuOutline, addOutline, removeOutline, } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { ManageCategoriesApi } from "../../service";
import { useQuery } from "react-query";
import { BACKEND_BASE_URL } from "../../constants/url";
const WebsiteHeader = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  let userDetails = LocalStorageHelper?.getItem(localStorageConst?.JWTUSER);
  const isLoggedIn = userDetails ? true : false;
  const [ismobileMenu, setismobileMenu] = useState(false);
  const {
    productMenuCategory
  } = new ManageCategoriesApi();

  const { data } = useQuery('menu-categories', productMenuCategory);

  useEffect(() => {
    if (data && data.response && Array.isArray(data.response)) {
      setcategories(data?.response)
    }
  }, [data])
  const [categories, setcategories] = useState([]);

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
  const wishlistBtn = (<button className="action-btn" onClick={() => { isLoggedIn ? navigate("/wishlist") : navigate("/login"); }}><IonIcon icon={heartOutline} /><span className="count">0</span></button>);
  const searchBtn = (<div className="header-search-container"><input type="search" name="search" className="search-field" placeholder="Enter your product name..." /><button className="search-btn"><IonIcon icon={searchOutline} /></button></div>);
  const personOutlineBtn = (<button className="action-btn" onClick={() => { isLoggedIn ? navigate("/dashboard") : navigate("/login"); }}><IonIcon icon={personOutline} /></button>);
  const cartBtn = (<button className="action-btn" onClick={() => { isLoggedIn ? navigate("/cart") : navigate("/login"); }}><IonIcon icon={bagHandleOutline} /><span className="count">0</span></button>);
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
            <img src={process.env.PUBLIC_URL + "/assets/images/modenteologo.jpeg"} alt="Modenteo" width="180" height="36" />
          </a>
          <div className="header-user-actions">
            {searchBtn}
            {wishlistBtn}
            {cartBtn}
            {personOutlineBtn}

          </div>
        </div>
      </div>
      <nav id="myHeader" className={isSticky ? "desktop-navigation-menu sticky" : "desktop-navigation-menu"}>
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
              <div className="dropdown-panel">
                {categories.length > 0 && categories.map((cat,key) => {
                  return (
                    <ul className="dropdown-panel-list" key={key}>
                      <li className="menu-title">
                        <a href={"/category/" + cat?.categorySlug}>{cat?.categoryName}</a>
                      </li>
                      {
                        cat?.subCategory.map((subcat) => {
                          return (
                            <li className="panel-list-item">
                              <a href={"/category/" + cat?.categorySlug + "/" + subcat?.slug}>{subcat?.name}</a>
                            </li>
                          )
                        })
                      }
                      <li className="panel-list-item img">
                        <a href={"/category/" + cat?.categorySlug}>
                          <img
                            src={BACKEND_BASE_URL + cat?.image}
                            alt="headphone collection"
                            width="250"
                            height="119"
                          />
                        </a>
                      </li>
                    </ul>
                  )
                })}

              </div>
            </li>
            {categories.length > 0 && categories.map((cat) => {
              return (
                <li className="menu-category">
                  <a className="menu-title" href={"/category/" + cat?.categorySlug}>{cat?.categoryName}</a>
                  <ul className="dropdown-list">
                    {
                      cat?.subCategory.map((subcat) => {
                        return (
                          <li className="dropdown-item">
                            <a href={"/category/" + cat?.categorySlug + "/" + subcat?.slug}>{subcat?.name}</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })}
            <li className="menu-category">
              <a href="/" className="menu-title">
                New
              </a>
            </li>
            <li className="menu-category">
              <a href="/" className="menu-title">
                Season
              </a>
            </li>

          </ul>
        </div>
      </nav>

      <div className="mobile-bottom-navigation">
        <button className="action-btn" onClick={() => setismobileMenu(!ismobileMenu)}>
          <IonIcon icon={menuOutline} />
        </button>
        {cartBtn}
        {wishlistBtn}
        {personOutlineBtn}
      </div>
      <nav className={ismobileMenu ? "mobile-navigation-menu has-scrollbar active" : "mobile-navigation-menu has-scrollbar"}>
        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>
          <button className="menu-close-btn" onClick={() => setismobileMenu(!ismobileMenu)}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <a href="/" className="menu-title">
              Home
            </a>
          </li>

          {categories.length > 0 && categories.map((cat) => {
            return (
              <li key={cat?.id} className="menu-category">
                <button className={cat?.isOpen ? "accordion-menu active" : "accordion-menu"} onClick={() => toggleAccordion(cat?.id)}>
                  <p className="menu-title">{cat?.categoryName}</p>
                  <div>
                    <IonIcon className="add-icon" icon={addOutline} />
                    <IonIcon className="remove-icon" icon={removeOutline} />
                  </div>
                </button>
                {cat?.subCategory.length > 0 && (
                  <ul className={cat?.isOpen ? "submenu-category-list active" : "submenu-category-list"}>
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
