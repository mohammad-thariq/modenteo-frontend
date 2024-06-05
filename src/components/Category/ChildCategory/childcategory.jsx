import React, { useEffect, useState } from 'react';
import '../../../styles/categoryindividual.css';
import ProductCard from '../../Product/product-card';
import { ManageProductsApi } from '../../../service';
import { CustomPagination, Loading, Error, NoRecordFound } from '../../../common'
import Filter from '../../Filter/filter';
import FilterGrid from '../../FilterGrid/filter-grid';
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
const { subcategoryProducts } = new ManageProductsApi();
const fetchSubcategoryProducts = (cat, subcat) => () => subcategoryProducts(cat, subcat);

const ChildCategory = () => {

    const { id, cat } = useParams();
    const { data, isLoading, isError, error, refetch } = useQuery('subcategory-product', fetchSubcategoryProducts(cat, id));
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(data?.data.length / itemsPerPage);

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
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error message={error.message} onRetry={refetch} />
    }

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length <= 0) {
        return <NoRecordFound />;
    }


    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-9'>
                        <FilterGrid itemsPerPageCount={getPaginatedData().length} totalCount={data?.data.length} />
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
                    <Filter />
                </div>
            </div>
        </section>
    );
};

export default ChildCategory;
