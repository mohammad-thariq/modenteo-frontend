import React, { useState } from "react";
import { LocalStorageHelper } from "../../utils/localStorage";
import { localStorageConst } from "../../constants/localStorage";
import { Reload } from "../../helper/base";
import { NameAvatar } from "../Avatar/avatar";
import { HandBurgerIcon } from "../illustration/handburger";

const Header = () => {
  const [isClassAdded, setIsClassAdded] = useState(true);
  const [isClassMobile, setIsClassMobile] = useState(false);
 


  const handleLogout = () => {
    LocalStorageHelper?.removeItem(localStorageConst.JWTUSER);
    LocalStorageHelper?.removeItem(localStorageConst.USER);
    LocalStorageHelper?.removeItem(localStorageConst.EXPIREIN);
    LocalStorageHelper?.removeItem(localStorageConst.REMEMBER);
    Reload();
  };
  let userDetails = LocalStorageHelper?.getItem(localStorageConst?.USER);


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
