import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/category.css';
import { ManageCategoriesApi } from '../../../service';
import { useQuery } from "react-query";
import { Loading, Error, NoRecordFound } from '../../../common';
import { getNextJsOptimizedUrl } from '../../helper/image';
import { baseURL, imgURL } from '../../../config';

const Category = () => {
    const {
        productCategory
    } = new ManageCategoriesApi();

    const { data, isLoading, isError, error, refetch } = useQuery('categories', productCategory);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error message={error.message} onRetry={refetch} />
    }

    // Ensure data is not null or undefined and contains the 'categories' property
    if (!data || !data.categories || !Array.isArray(data.categories)) {
        return <NoRecordFound />;
    }

    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className="row">
                    {data.categories.map(item => (
                        <div key={item.slug} className="col-sm-6 col-md-6 col-lg-4">
                            <div className="category-section-blocks">
                                <Link to={baseURL + "category/" + item.slug} className="cat-list-img">
                                    <img src={getNextJsOptimizedUrl(imgURL + item.image, 96, 75)} alt={item.name} />
                                </Link>
                                <Link to={baseURL + "category/" + item.slug}>{item.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
