import React, { useEffect, useState } from "react";
import "../../styles/individualproduct.css";
import ProductSlider from "../Slider/product-slider";
import ProductDetails from "./product-details";
import ProductGallery from "./product-gallery";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { ManageProductsApi } from "../../service";
import { PageTitle, SectionTitle } from "../../common";
const { productbySlug, similarProducts } = new ManageProductsApi();
const fetchProductbySlug = (id) => () => productbySlug(id);

const Product = () => {
  const { id } = useParams();
  const [productDetails, setproductDetails] = useState({});
  const [productsSimilar, setproductsSimilar] = useState([]);
  const { data } = useQuery("product", fetchProductbySlug(id), {
    enabled: id != null ? true : false,
  });

  const { mutate: getSimilarProducts } = useMutation(similarProducts, {
    onSuccess: (data) => {
      setproductsSimilar(data?.products);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    if (data && data?.products) {
      setproductDetails(data?.products);
      getSimilarProducts(data?.products?.sub_category_id);
    }
  }, [data, getSimilarProducts]);

  let similarPRD = productsSimilar.filter(
    (product) => product?.id !== productDetails?.id
  );
  
  return (
    <>
    <PageTitle title={productDetails?.seo_title} description={productDetails?.seo_description}/>
    <section className="cat-outer-section">
      <div className="container">
        <div className="product-details-top">
          <div className="row">
            <ProductGallery data={productDetails} />
            <ProductDetails data={productDetails} />
          </div>
          {/* <ProductDetailsTab data={productDetails} /> */}
        </div>
        {similarPRD.length > 0 && (
            <SectionTitle title="Similar Products" subtitle="What do you think of these?"/>
        )}
        <div className="product-slider ">
          <ProductSlider images={similarPRD} />
        </div>
      </div>
    </section>
    </>
  );
};

export default Product;
