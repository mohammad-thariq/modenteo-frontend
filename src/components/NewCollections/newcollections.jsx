import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/category.css';
import { ManageCategoriesApi } from '../../service';
import { useQuery } from "react-query";
import { BASE_URL, BACKEND_IMG_URL } from '../../constants/url';
import { Loading, NoRecordFound } from '../../common';
import { useParams } from 'react-router-dom';
import { getNextJsOptimizedUrl } from '../../helper/image';
const { productMenuNew } = new ManageCategoriesApi();

const NewCollections = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery('menu-new-collections', productMenuNew);

    if (isLoading) {
        return <Loading />;
    }

    // Ensure data is not null or undefined and contains the 'categories' property
    if (!data || !data.response) {
        return <NoRecordFound />;
    }

    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className="row">
                    {data.response.map(item => (
                        <div key={item.slug} className="col-sm-6 col-md-6 col-lg-4">
                            <div className="category-section-blocks">
                                <Link to={BASE_URL + "new/" + item.slug} className="cat-list-img">
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <Link to={BASE_URL + "new/" + item.slug}>{item.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewCollections;
