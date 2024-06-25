import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { lastPathObjects } from "../../constants/otherConstants";
import { stringFormatter } from "../../utils/stringFormatter";
import "../../styles/product.css";

export const HeaderTitle = ({ defaultTitle }) => {
  const location = useLocation();
  const paths = location.pathname?.split("/").filter((path) => path !== ""); // Split URL path into segments
  const [currentTitleHeader, setCurrentTitleHeader] = useState("");

  function checkLastElement(array, obj) {
    const lastElement = array[array.length - 1];
    return Object.values(obj).includes(lastElement);
  }
  console.log(paths, "paths");

  useEffect(() => {
    const lastPath = paths.find((path, index) => {
      const lastIndex = index === paths.length - 1;
      return lastIndex;
    });
    const secondLastPath = paths.find((path, index) => {
      const secondLastIndex = index === paths.length - 2;
      return secondLastIndex;
    });
    if (checkLastElement(paths, lastPathObjects)) {
      setCurrentTitleHeader(
        `Clothing For ${lastPath?.charAt(0).toUpperCase() + lastPath?.slice(1)}`
      );
    } else if (lastPath === "products") {
      setCurrentTitleHeader(stringFormatter(defaultTitle));
    } else {
      setCurrentTitleHeader(
        `${lastPath?.charAt(0).toUpperCase() + lastPath?.slice(1)} For ${
          secondLastPath?.charAt(0).toUpperCase() + secondLastPath?.slice(1)
        }`
      );
    }
  }, [defaultTitle, paths]);

  console.log(currentTitleHeader, "currentTitleHeader");

  return (
    <div className="product_title_header ">
      <h1>{currentTitleHeader}</h1>
    </div>
  );
};
