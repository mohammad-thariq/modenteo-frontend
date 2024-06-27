import React, { useCallback, useEffect, useState } from "react";
import "../../styles/categoryindividual.css";
import ProductCard from "../Product/product-card";
import {
  ManageCategoriesApi,
  ManageMenusApi,
  ManageProductsApi,
} from "../../service";
import {
  CustomPagination,
  Loading,
  Error,
  NoRecordFound,
  Breadcrumb,
} from "../../common";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { HeaderTitle } from "../../common/HeaderTitle";
import { FilterPanel } from "../FilterPanel";
import {
  ProductFilterBySlug,
  ProductFilterForKids,
  ProductFilterForMens,
  ProductFilterForWomens,
} from "../../constants/productFilters";
import { lastPathObjects } from "../../constants/otherConstants";
import { ManageBrandsApi } from "../../service/brands/brand";

const defeaultFilteringValue = {
  brands: undefined,
  collections: undefined,
  mensWear: undefined,
  womensWear: undefined,
  kidsWear: undefined,
  price: undefined,
};

const ProductListing = () => {
  const { id } = useParams();
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setproductList] = useState([]);
  const [currentPageSlug, setCurrentPageSlug] = useState();
  const [availableFilterData, setAvailableFilterData] = useState();
  const [availableSubCategory, setAvailableSubCategory] = useState();
  const [productFilterData, setProductFilterData] = useState(
    defeaultFilteringValue
  );

  const { productsbyMainCategory } = new ManageProductsApi();
  const { productMenuCategory } = new ManageCategoriesApi();
  const { menuCollections } = new ManageMenusApi();
  const { getBrands } = new ManageBrandsApi();

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["category-product", id, productFilterData],
    productsbyMainCategory,
    { enabled: !!id }
  );

  const { data: availableCategory } = useQuery(
    "sub-category",
    productMenuCategory
  );

  const { data: availableCollections } = useQuery(
    "collections",
    menuCollections
  );

  const { data: availableBrands } = useQuery("brands", getBrands);

  useEffect(() => {
    if (data?.data) {
      setproductList(data?.data);
    }
  }, [data]);

  useEffect(() => {
    const subCategory = availableCategory?.response?.find(
      (elem) => elem?.categorySlug === currentPageSlug
    );
    if (currentPageSlug === lastPathObjects.MENS) {
      setAvailableFilterData(ProductFilterForMens);
      if (subCategory?.categorySlug === lastPathObjects.MENS) {
        setAvailableSubCategory(subCategory);
      }
    } else if (currentPageSlug === lastPathObjects.WOMENS) {
      setAvailableFilterData(ProductFilterForWomens);
      if (subCategory?.categorySlug === lastPathObjects.WOMENS) {
        setAvailableSubCategory(subCategory);
      }
    } else if (currentPageSlug === lastPathObjects.KIDS) {
      setAvailableFilterData(ProductFilterForKids);
      if (subCategory?.categorySlug === lastPathObjects.KIDS) {
        setAvailableSubCategory(subCategory);
      }
    } else {
      setAvailableFilterData(ProductFilterBySlug);
    }
  }, [availableCategory?.response, currentPageSlug]);

  const totalPages = productList
    ? Math.ceil(productList.length / itemsPerPage)
    : 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productList?.slice(startIndex, endIndex);
  };

  const onFilterChange = useCallback(
    (fielName, value) => {
      setProductFilterData((prevObj) => ({ ...prevObj, [fielName]: value }));
      setCurrentPage(1);
    },
    [setCurrentPage, setProductFilterData]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error.message} onRetry={refetch} />;
  }

  if (productList.length <= 0) {
    return <NoRecordFound />;
  }

  return (
    <section className="cat-outer-section">
      <div className="container">
        <Breadcrumb />
        <HeaderTitle onCurrentSlug={setCurrentPageSlug} />
        <FilterPanel
          availableFilterOptions={availableFilterData}
          totalProduct={getPaginatedData()?.length}
          availableCollections={availableCollections}
          availableBrands={availableBrands}
          availableSubCategory={availableSubCategory}
          onFilterChange={onFilterChange}
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="products mb-3">
              <div className="row justify-content-center">
                {getPaginatedData().map((data, key) => {
                  return (
                    <div key={key} className="col-6 col-md-3 col-lg-3 col-xl-3">
                      <ProductCard key={key} data={data} />
                    </div>
                  );
                })}
              </div>
            </div>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          {/* <Filter /> */}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
