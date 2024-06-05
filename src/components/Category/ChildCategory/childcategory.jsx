import React, { useEffect, useState } from 'react';
import '../../../styles/categoryindividual.css';
import ProductCard from '../../Product/product-card';
import { ManageProductsApi } from '../../../service';
import { CustomPagination, Loading, Error, NoRecordFound } from '../../../common'
// import Filter from '../../Filter/filter';
// import FilterGrid from '../../FilterGrid/filter-grid';
import { useQuery } from "react-query";
import { useParams, useSearchParams } from 'react-router-dom';
const { subcategoryProducts, productsbySlug } = new ManageProductsApi();
const fetchSubcategoryProducts = (cat, subcat) => () => subcategoryProducts(cat, subcat);
const fetchProducts = (slug) => () => productsbySlug(slug);

const ChildCategory = () => {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get('slug');
    console.log(slug, 'slug')
    const { id, cat } = useParams();
    const { data, isLoading, isError, error, refetch } = useQuery('subcategory-product', fetchSubcategoryProducts(cat, id), { enabled: id != null ? true : false });
    const { data: collectionProducts, isLoading: isLoadingProducts, isError: isErrorProducts, } = useQuery('slug-product', fetchProducts(slug), { enabled: slug != null ? true : false });
    console.log(collectionProducts,'collectionProducts')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = data ? Math.ceil(data?.data.length / itemsPerPage) : 0;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data?.data.slice(startIndex, endIndex);
    };
    useEffect(() => {

    }, [data?.data])
    if (isLoading || isLoadingProducts) {
        return <Loading />;
    }

    if (isError || isErrorProducts) {
        return <Error message={error.message} onRetry={refetch} />
    }

    if ((!data || !data.data || !Array.isArray(data.data) || data.data.length <= 0)  ) {
        return <NoRecordFound />;
    }


    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-12'>
                        {/* <FilterGrid itemsPerPageCount={getPaginatedData().length} totalCount={data?.data.length} /> */}
                        <div className='products mb-3'>
                            <div className='row justify-content-center'>

                                {getPaginatedData().map((data, key) => {
                                    return (<div key={key} className="col-6 col-md-4 col-lg-4 col-xl-3">
                                        <ProductCard key={key} data={data} />
                                    </div>)
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
