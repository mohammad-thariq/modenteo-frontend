export const customStyles = {
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
      zIndex: 2,
    }),
  };