export const stringFormatter = (str) => {
  const words = str.split("-");

  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
};
