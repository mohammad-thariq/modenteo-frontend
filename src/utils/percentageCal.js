export const calculateDiscountPercentage = (originalPrice, offerPrice) => {
  const discountAmount = originalPrice - offerPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return discountPercentage;
};
