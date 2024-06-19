import React from "react";
import { Link } from "react-router-dom";
import "../../styles/category.css";
import { ManageMenusApi } from "../../service";
import { useQuery } from "react-query";
import { Loading, Error, NoRecordFound } from "../../common";
import { baseURL } from "../../config";

const Seasons = () => {
  const { menuCollections } = new ManageMenusApi();

  const { data, isLoading, isError, error, refetch } = useQuery(
    "menu-collections",
    menuCollections
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error.message} onRetry={refetch} />;
  }

  // Ensure data is not null or undefined and contains the 'categories' property
  if (!data || !data.collections || !Array.isArray(data.collections)) {
    return <NoRecordFound />;
  }

  return (
    <section className="cat-outer-section">
      <div className="container">
        <div className="row">
          {data.collections.map((item) => (
            <div key={item.slug} className="col-sm-6 col-md-6 col-lg-4">
              <div className="category-section-blocks">
                <Link
                  to={baseURL + "products?slug=" + item.slug}
                  className="cat-list-img"
                >
                  <img src={item.image} alt={item.name} />
                </Link>
                <Link to={baseURL + "products?slug=" + item.slug}>
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Seasons;
