import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ColorPalette } from "../../common";
const Filter = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 750]);
  const [selectedColor, setSelectedColor] = useState("");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderAccordionItem = (
    index,
    title,
    content,
    activeIndex,
    toggleAccordion
  ) => (
    <div className="widget widget-collapsible">
      <h3 className="widget-title">
        <a
          href={() => toggleAccordion(index)}
          aria-expanded={activeIndex === index}
          aria-controls={`widget-${index}`}
          className={activeIndex === index ? "" : "collapsed"}
        >
          {title}
        </a>
      </h3>

      <div
        className={`collapse ${activeIndex === index ? "show" : ""}`}
        id={`widget-${index}`}
      >
        <div className="widget-body">{content}</div>
      </div>
    </div>
  );

  const renderCategoryFilters = () => (
    <div className="filter-items filter-items-count">
      {renderFilterItem("cat-1", "Dresses", 3)}
      {renderFilterItem("cat-2", "T-shirts", 0)}
      {renderFilterItem("cat-3", "Bags", 4)}
      {renderFilterItem("cat-4", "Jackets", 2)}
      {renderFilterItem("cat-5", "Shoes", 2)}
      {renderFilterItem("cat-6", "Jumpers", 1)}
      {renderFilterItem("cat-7", "Jeans", 1)}
      {renderFilterItem("cat-8", "Sportwear", 0)}
    </div>
  );

  const renderSizeFilters = () => (
    <div className="filter-items">
      {renderSizeFilterItem("size-1", "XS")}
      {renderSizeFilterItem("size-2", "S")}
      {renderSizeFilterItem("size-3", "M", true)}
      {renderSizeFilterItem("size-4", "L", true)}
      {renderSizeFilterItem("size-5", "XL")}
      {renderSizeFilterItem("size-6", "XXL")}
    </div>
  );

  const renderBrandFilters = () => (
    <div className="filter-items">
      {renderBrandFilterItem("brand-1", "Next")}
      {renderBrandFilterItem("brand-2", "River Island")}
      {renderBrandFilterItem("brand-3", "Geox")}
      {renderBrandFilterItem("brand-4", "New Balance")}
      {renderBrandFilterItem("brand-5", "UGG")}
      {renderBrandFilterItem("brand-6", "F&F")}
      {renderBrandFilterItem("brand-7", "Nike")}
    </div>
  );

  const renderPriceFilter = (priceRange, setPriceRange) => (
    <div className="filter-price">
      <div className="filter-price-text">
        Price Range:
        <span id="filter-price-range">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>
      <Slider
        range
        min={0}
        value={priceRange}
        onChange={(value) => setPriceRange(value)}
        trackStyle={[{ backgroundColor: "#b87145" }]}
        handleStyle={[{ borderColor: "#b87145" }, { borderColor: "#b87145" }]}
      />
    </div>
  );

  const renderFilterItem = (id, label, count) => (
    <div className="filter-item">
      <div className="custom-control custom-checkbox">
        <input id={id} type="checkbox" />
        <label htmlFor={id}>{label}</label>
      </div>
      <span className="item-count">{count}</span>
    </div>
  );

  const renderSizeFilterItem = (id, label, checked = false) => (
    <div className="filter-item">
      <div className="custom-control custom-checkbox">
        <input id={id} type="checkbox" />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );

  const renderBrandFilterItem = (id, label) => (
    <div className="filter-item">
      <div className="custom-control custom-checkbox">
        <input id={id} type="checkbox" />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
  const colors = [
    "#A76D44",
    "#E6C56E",
    "#333333",
    "#D14F41",
    "#6EA544",
    "#E88C9D",
    "#EDEDED",
    "#4F9CD3",
  ];
  const clearAll = () => {
    setSelectedColor("");
  };
  return (
    <aside className="col-lg-3 order-lg-first">
      <div className="sidebar-product sidebar-shop">
        <div className="widget widget-clean">
          <label>Filters:</label>
          <a
            href="/"
            onClick={() => clearAll()}
            className="sidebar-filter-clear"
          >
            Clean All
          </a>
        </div>

        {renderAccordionItem(
          0,
          "Category",
          renderCategoryFilters(),
          activeIndex,
          toggleAccordion
        )}
        {renderAccordionItem(
          1,
          "Size",
          renderSizeFilters(),
          activeIndex,
          toggleAccordion
        )}
        {renderAccordionItem(
          2,
          "Colour",
          <ColorPalette
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={(color) => setSelectedColor(color)}
          />,
          activeIndex,
          toggleAccordion
        )}
        {renderAccordionItem(
          3,
          "Brand",
          renderBrandFilters(),
          activeIndex,
          toggleAccordion
        )}
        {renderAccordionItem(
          4,
          "Price",
          renderPriceFilter(priceRange, setPriceRange),
          activeIndex,
          toggleAccordion
        )}
      </div>
    </aside>
  );
};

export default Filter;
