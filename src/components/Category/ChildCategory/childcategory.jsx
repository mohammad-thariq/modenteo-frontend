import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/categoryindividual.css";
import ProductCard from "../../Product/product-card";
import { ManageMenusApi, ManageProductsApi } from "../../../service";
import {
  CustomPagination,
  Loading,
  Error,
  NoRecordFound,
  Breadcrumb,
} from "../../../common";
// import Filter from '../../Filter/filter';
// import FilterGrid from '../../FilterGrid/filter-grid';
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { HeaderTitle } from "../../../common/HeaderTitle";
import { lastPathObjects } from "../../../constants/otherConstants";
import {
  ProductFilterBySlug,
  ProductFilterForKids,
  ProductFilterForMens,
  ProductFilterForWomens,
} from "../../../constants/productFilters";
import { FilterPanel } from "../../FilterPanel";
import { ManageBrandsApi } from "../../../service/brands/brand";

const defeaultFilteringValue = {
  brands: undefined,
  collections: undefined,
  mensWear: undefined,
  womensWear: undefined,
  kidsWear: undefined,
  price: undefined,
};

const ChildCategory = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const { id, cat } = useParams();
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setproductList] = useState([]);
  const [availableFilterData, setAvailableFilterData] = useState();
  const [currentPageSlug, setCurrentPageSlug] = useState();
  const [productFilterData, setProductFilterData] = useState(
    defeaultFilteringValue
  );

  const { subcategoryProducts, productsbySlug } = new ManageProductsApi();
  const { menuCollections } = new ManageMenusApi();
  const { getBrands } = new ManageBrandsApi();
  const fetchProducts = (slug) => () => productsbySlug(slug);

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["subcategory-product", cat, id, productFilterData],
    subcategoryProducts,
    { enabled: !!id }
  );

  const {
    data: collectionProducts,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery("slug-product", fetchProducts(slug), {
    enabled: slug != null ? true : false,
  });

  const { data: availableCollections } = useQuery(
    "collections",
    menuCollections
  );

  const { data: availableBrands } = useQuery("brands", getBrands);

  useEffect(() => {
    if (data?.data) {
      setproductList(data?.data);
    }
    if (collectionProducts?.data) {
      setproductList(collectionProducts?.data);
    }
  }, [collectionProducts, data]);

  useEffect(() => {
    if (currentPageSlug === lastPathObjects.MENS) {
      setAvailableFilterData(ProductFilterForMens);
    } else if (currentPageSlug === lastPathObjects.WOMENS) {
      setAvailableFilterData(ProductFilterForWomens);
    } else if (currentPageSlug === lastPathObjects.KIDS) {
      setAvailableFilterData(ProductFilterForKids);
    } else {
      setAvailableFilterData(ProductFilterBySlug);
    }
  }, [currentPageSlug]);

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

  if (isLoading || isLoadingProducts) {
    return <Loading />;
  }

  if (isError || isErrorProducts) {
    return <Error message={error.message} onRetry={refetch} />;
  }

  if (productList.length <= 0) {
    return <NoRecordFound />;
  }

  return (
    <section className="cat-outer-section">
      <div className="container">
        <Breadcrumb />
        <HeaderTitle
          defaultTitle={slug && slug}
          onCurrentSlug={setCurrentPageSlug}
        />
        <FilterPanel
          availableFilterOptions={availableFilterData}
          totalProduct={getPaginatedData()?.length}
          availableCollections={availableCollections}
          availableBrands={availableBrands}
          onFilterChange={onFilterChange}
        />
        <div className="row">
          <div className="col-lg-12">
            {/* <FilterGrid itemsPerPageCount={getPaginatedData().length} totalCount={data?.data.length} /> */}
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

export default ChildCategory;
