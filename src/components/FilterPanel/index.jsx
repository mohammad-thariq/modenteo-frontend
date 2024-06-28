import React, { useCallback, useMemo, useState } from "react";
import Select from "react-select";
import "../../styles/filterPanel.css";
import { IonIcon } from "@ionic/react";
import { alertCircle, filterOutline } from "ionicons/icons";
import { SortingOptions } from "../../constants/productFilters";
import { customStyles } from "./style";
import { useNavigate } from "react-router-dom";


export const FilterPanel = ({
  availableFilterOptions,
  totalProduct,
  availableCollections,
  availableBrands,
  availableSubCategory,
  onFilterChange,
}) => {
  const navigate = useNavigate();
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleShowMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  const ProductFilterData = useMemo(() => {
    const manipulatedFilterSettings = {};
    if (availableFilterOptions) {
      Object.entries(availableFilterOptions).map(([filterOption, value]) => {
        let availableOptions = value.availableOptions.map((each) => ({
          label: each.name,
          value: each.id,
        }));

        if (filterOption === "collections") {
          availableOptions = availableCollections?.collections?.map((elem) => ({
            value: elem.id,
            label: elem.name,
          }));
        }

        if (filterOption === "brands") {
          availableOptions = availableBrands?.brands?.map((elem) => ({
            value: elem.id,
            label: elem.name,
          }));
        }

        if (filterOption === "mensWear") {
          availableOptions = availableSubCategory?.subCategory?.map((elem) => ({
            value: elem.id,
            label: elem.name,
          }));
        }

        if (filterOption === "womensWear") {
          availableOptions = availableSubCategory?.subCategory?.map((elem) => ({
            value: elem.id,
            label: elem.name,
          }));
        }

        if (filterOption === "kidsWear") {
          availableOptions = availableSubCategory?.subCategory?.map((elem) => ({
            value: elem.id,
            label: elem.name,
          }));
        }

        if (filterOption === "productCatalog") {
          availableOptions = SortingOptions?.map((elem) => ({
            value: elem.value,
            label: elem.label,
          }));
        }

        const modifiedValue = {
          name: value.name,
          availableOptions,
          placeholder: value.placeholder,
        };
        manipulatedFilterSettings[filterOption] = modifiedValue;

        return null;
      });
    }

    return manipulatedFilterSettings;
  }, [
    availableBrands?.brands,
    availableCollections?.collections,
    availableFilterOptions,
    availableSubCategory?.subCategory,
  ]);

  const onFilterChangeWithFormattedValues = useCallback(
    (fieldName, value) => {
      const chosenValue = value && value?.map((elem) => elem);
      onFilterChange(fieldName, chosenValue);
    },
    [onFilterChange]
  );

  return (
    <>
      <div className="filterWrapper">
        <div>
          {Object.entries(ProductFilterData)
            .filter(([filterOption]) => filterOption === "productCatalog")
            .map(([filterOption, i]) => (
              <Select
                key={filterOption}
                closeMenuOnSelect={false}
                isMulti
                isSearchable
                onChange={(e) =>
                  onFilterChangeWithFormattedValues(filterOption, e)
                }
                options={i?.availableOptions}
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "black",
                    primary: "black",
                  },
                })}
                placeholder={i.placeholder}
              />
            ))}
        </div>
        {showMoreFilters && (
          <div className={`more-filters ${showMoreFilters ? "show" : ""}`}>
            {Object.entries(ProductFilterData)
            .filter(([filterOption]) => filterOption !== "productCatalog")
            .map(([filterOption, i]) => (
                <Select
                  key={filterOption}
                  closeMenuOnSelect={false}
                  isMulti
                  isSearchable
                  onChange={(e) =>
                    onFilterChangeWithFormattedValues(filterOption, e)
                  }
                  options={i?.availableOptions}
                  styles={customStyles}
                  name={i?.name}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "black",
                      primary: "black",
                    },
                  })}
                  placeholder={i?.placeholder}
                />
              ))}
          </div>
        )}
        <div className="filter-btn" onClick={handleShowMoreFilters}>
          <IonIcon icon={filterOutline} />
          <p>{showMoreFilters ? "Less" : "More"} filters</p>
        </div>
      </div>
      <div className="total-products">
        <p>{totalProduct} products</p>
        <IonIcon
          onClick={() => navigate('/page/how-product-recommendations-work')}
          icon={alertCircle}
          style={{ cursor: "pointer" }}
          title="How we recommend products? click to see more"
        />
      </div>
    </>
  );
};
