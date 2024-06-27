import React, { useCallback, useMemo, useState } from "react";
import Select from "react-select";
import "../../styles/filterPanel.css";
import { IonIcon } from "@ionic/react";
import { alertCircle, filterOutline } from "ionicons/icons";
import { SortingOptions } from "../../constants/otherConstants";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "black"
      : state.isFocused
      ? "black"
      : "white",
    color: state.isSelected ? "white" : state.isFocused ? "white" : "#1a1a1a",
    fontSize: "14px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    cursor: "pointer",
    width: "280px",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    width: "max-content",
    borderColor: "black",
    fontWeight: "400",
    boxShadow: "none",
    "&:hover": {
      borderColor: "black",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    ":hover": {
      backgroundColor: "darkgray",
      color: "black",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
    fontSize: "16px",
    fontWeight: 400,
  }),
  menu: (provided) => ({
    ...provided,
    padding: "10px",
    width: "300px",
  }),
};

export const FilterPanel = ({
  availableFilterOptions,
  totalProduct,
  availableCollections,
  availableBrands,
  availableSubCategory,
  onFilterChange,
}) => {
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
        <Select
          closeMenuOnSelect={false}
          isMulti
          isSearchable
          options={SortingOptions}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "black",
              primary: "black",
            },
          })}
          placeholder="Sort By"
        />
        {showMoreFilters && (
          <div className={`more-filters ${showMoreFilters ? "show" : ""}`}>
            {Object.entries(ProductFilterData)?.map(([filterOption, i]) => (
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
          icon={alertCircle}
          style={{ cursor: "pointer" }}
          title="How we recommend products? click to see more"
        />
      </div>
    </>
  );
};
