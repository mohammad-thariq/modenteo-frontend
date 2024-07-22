import React from "react";
import Menu from "../Menu/menu";
import "../../styles/sidebar.css";
// import { LocalStorageHelper } from "../../utils/localStorage";
// import { localStorageConst } from "../../constants/localStorage";
// import { NameAvatar } from "../Avatar/avatar";

const SideBar = () => {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath
    .split("/")
    .filter((segment) => segment !== "");
  const firstPath =
    pathSegments.length > 0 ? pathSegments[0] : "No path available";
  // let userDetails = LocalStorageHelper?.getItem(localStorageConst?.USER);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {/* <li className="nav-item nav-profile">
          <a href="/" className="nav-link">
            <NameAvatar name={userDetails?.name} />
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold">{userDetails?.name}</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li> */}

        {Menu.map((item, index) => (
          <li
            key={index}
            className={
              firstPath === item?.slug ? "nav-item active" : "nav-item"
            }
          >
            <a className="nav-link" href={"/" + item?.slug}>
              <span className="menu-title">{item?.name}</span>
              <i className={item?.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
