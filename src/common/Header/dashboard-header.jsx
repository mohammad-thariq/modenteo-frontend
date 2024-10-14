import React, { useState } from "react";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { Reload } from "../../helper/base";
import { NameAvatar } from "../Avatar/avatar";
import { HandBurgerIcon } from "../illustration/handburger";
import { SearchProductsAPI } from "../../service/search";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";

const Header = () => {
  const navigate = useNavigate();
  const [isClassAdded, setIsClassAdded] = useState(true);
  const [isClassMobile, setIsClassMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const {getSearchProduct} = new SearchProductsAPI()  


  const handleLogout = () => {
    LocalStorageHelper?.removeItem(localStorageConst.JWTUSER);
    LocalStorageHelper?.removeItem(localStorageConst.USER);
    LocalStorageHelper?.removeItem(localStorageConst.EXPIREIN);
    LocalStorageHelper?.removeItem(localStorageConst.REMEMBER);
    Reload();
  };
  let userDetails = LocalStorageHelper?.getItem(localStorageConst?.USER);

    // Fetch search results using react-query
    const { data: searchProduct, isFetching } = useQuery(
      ["search-product", searchTerm],
      () => getSearchProduct(searchTerm),
      {
        enabled: !!searchTerm, // Only enable if there's a searchTerm
        onSuccess: (data) => {
          // Update the searchResults with correct data mapping
          if (data.success === 1 && data.results) {
            setSearchResults(data.results);
          } else {
            setSearchResults([]);
          }
        },
      }
    );
  

  const  handleNavigatetoSearchResult = (slug) => {
    navigate(`product/${slug}`);
  }

    // Handle input change and update the searchTerm state
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // Clear the search when the user deletes the input
    const handleClearSearch = () => {
      setSearchTerm("");
      setSearchResults([]);
    };

  const toggleMenu = (type) => {
    if (type === "minimize") {
      if (isClassAdded) {
        document.body.classList.add("sidebar-icon-only");
      } else {
        document.body.classList.remove("sidebar-icon-only");
      }
    } else {
      const element = document.getElementById("sidebar");
      if (element) {
        if (!isClassMobile) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
        setIsClassAdded(!isClassAdded);
      }
    }
  };

  const searchBtn = (
    <div className="header-user-actions">
    <div className="header-search-container">
      <input
        type="search"
        name="search"
        className="search-field"
        placeholder="Search Product Here..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="search-btn">
        <IonIcon icon={searchOutline} />
      </button>
      {searchTerm && (
            <div className="search-dropdown">
              {isFetching && <p>Loading...</p>}
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((product, index) => (
                    <li key={index} className="search-item" onClick={() => handleNavigatetoSearchResult(product?.slug)}>
                      {/* Displaying image, short_name, and description */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="search-result-image"
                        width="50"
                        height="50"
                      />
                      <span>{product.short_name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                !isFetching && <p>No results found</p>
              )}
            </div>
          )}
    </div>
    </div>
  );

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <a className="navbar-brand brand-logo" href="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/modenteologo.jpeg"}
            alt="logo"
          />
        </a>
        <a className="navbar-brand brand-logo-mini" href="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo-mini.png"}
            alt="logo"
          />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          onClick={(e) => {
            setIsClassAdded(!isClassAdded);
            toggleMenu("minimize");
          }}
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile ">
            <a
              className="nav-link "
              id=""
              href="/profile"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <NameAvatar name={userDetails?.name} />
              {/*  */}
              {/* <span className="availability-status online"></span> */}
              {/* <div className="nav-profile-img">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/faces/face1.jpg"
                  }
                  alt="User-avatar"
                />
              </div> */}
              <div className="nav-profile-text">
                <p className="mb-1 text-black">
                  {userDetails?.name || "Modenteo"}
                </p>
              </div>
            </a>
          </li>
          <li className="nav-item nav-logout">
            <a className="nav-link" href="/" onClick={() => handleLogout()}>
              <i className="mdi mdi-power"></i>
            </a>
          </li>
        </ul>
        <button
          onClick={(e) => {
            setIsClassMobile(!isClassMobile);
            toggleMenu("mobile");
          }}
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          {/* <span className="mdi mdi-menu"></span> */}
          <HandBurgerIcon />
        </button>
      </div>
    </nav>
  );
};

export default Header;
