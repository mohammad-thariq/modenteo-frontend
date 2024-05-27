import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/category.css';
import { ManageCategoriesApi } from '../../../service';
import { useQuery } from "react-query";
import { BACKEND_BASE_URL, BASE_URL } from '../../../constants/url';
import { Loading, Error, NoRecordFound } from '../../../common';
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
                                <Link to={BASE_URL + "category/" + item.slug} className="cat-list-img">
                                    <img src={BACKEND_BASE_URL + item.image} alt={item.name} />
                                </Link>
                                <Link to={BASE_URL + "category/" + item.slug}>{item.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
