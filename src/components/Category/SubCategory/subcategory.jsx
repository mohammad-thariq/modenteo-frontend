import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/category.css";
import { ManageCategoriesApi } from "../../../service";
import { useQuery } from "react-query";
import { Loading, NoRecordFound } from "../../../common";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../config";
const { categorySubcategory } = new ManageCategoriesApi();
const fetchCategorySubcategories = (categoryId) => () =>
  categorySubcategory(categoryId);
const SubCategory = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    "categorysubcategories",
    fetchCategorySubcategories(id)
  );

  if (isLoading) {
    return <Loading />;
  }

  // Ensure data is not null or undefined and contains the 'categories' property
  if (!data || !data.data) {
    return <NoRecordFound />;
  }

  return (
    <section className="cat-outer-section">
      <div className="container">
        <div className="row">
          {data.data.map((item) => (
            <div key={item.slug} className="col-sm-6 col-md-6 col-lg-4">
              <div className="category-section-blocks">
                <Link
                  to={baseURL + "category/" + id + "/" + item.slug}
                  className="cat-list-img"
                >
                  <img src={item.image} alt={item.name} />
                </Link>
                <Link to={baseURL + "category/" + id + "/" + item.slug}>
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

export default SubCategory;
