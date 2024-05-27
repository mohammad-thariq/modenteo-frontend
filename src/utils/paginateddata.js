let value = 2;
export const itemsPerPage = value;
export const getPaginatedData = (data, currentPage, itemsPerPage = value) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};
