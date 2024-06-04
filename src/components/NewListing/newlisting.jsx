import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/category.css';
import { ManageMenusApi } from '../../service';
import { useQuery } from "react-query";
import { BASE_URL, BACKEND_IMG_URL } from '../../constants/url';
import { Loading, Error, NoRecordFound } from '../../common';
import { getNextJsOptimizedUrl } from '../../helper/image';
const NewListing = () => {
    const {
        menuNewCollections
    } = new ManageMenusApi();

    const { data, isLoading, isError, error, refetch } = useQuery('new-collections', menuNewCollections);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error message={error.message} onRetry={refetch} />
    }

    // Ensure data is not null or undefined and contains the 'categories' property
    if (!data || !data.response || !Array.isArray(data.response)) {
        return <NoRecordFound />;
    }

    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className="row">
                    {data.response.map(item => (
                        <div key={item.slug} className="col-sm-6 col-md-6 col-lg-4">
                            <div className="category-section-blocks">
                                <Link to={BASE_URL + "category/" + item.slug} className="cat-list-img">
                                    <img src={getNextJsOptimizedUrl(BACKEND_IMG_URL + item.image, 96, 75)} alt={item.name} />
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

export default NewListing;
