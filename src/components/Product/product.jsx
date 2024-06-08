import React, { useEffect, useState } from "react";
import '../../styles/individualproduct.css';
import ProductSlider from "../Slider/product-slider";
import ProductDetailsTab from './product-details-tab';
import ProductDetails from "./product-details";
import ProductGallery from "./product-gallery";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { ManageProductsApi } from "../../service";
const productImages = [
    {
        name: "Shoe",
        slug: "shoe",
        image: process.env.PUBLIC_URL + "/assets/home/images/products/1.jpg",
    },
    {
        name: "Jacket",
        slug: "jacket",
        image: process.env.PUBLIC_URL + "/assets/home/images/products/2.jpg",
    },
    {
        name: "Skirt",
        slug: "skirt",
        image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-3.jpg",
    },
    {
        name: "Traditional Skirt",
        slug: "traditional-skirt",
        image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-4.jpg",
    },
    {
        name: "Traditional Skirt",
        slug: "traditional-skirt",
        image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-4.jpg",
    },
];
const { productbySlug, similarProducts } = new ManageProductsApi();
const fetchProductbySlug = (id) => () => productbySlug(id);

const Product = () => {
    const { id } = useParams();
    const [productDetails, setproductDetails] = useState({});
    const [productsSimilar, setproductsSimilar] = useState([]);
    const { data } = useQuery('product', fetchProductbySlug(id), { enabled: id != null ? true : false });
    useEffect(() => {
        if (data && data?.products) {
            setproductDetails(data?.products);
            getSimilarProducts(data?.products?.sub_category_id);

        }
    }, [data]);
    const { mutate: getSimilarProducts } = useMutation(similarProducts, {
        onSuccess: (data) => {
            setproductsSimilar(data?.products);

        },
        onError: (error) => {
            console.log(error?.message);
        },
    });
    let similarPRD = productsSimilar.filter(product => product?.id !== productDetails?.id);
    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className="product-details-top">
                    <div className="row">

                        <ProductGallery images={productImages} />
                        <ProductDetails data={productDetails} />
                    </div>
                    <ProductDetailsTab data={productDetails} />
                </div>
                <h2 className='sectitle'>Similar Products</h2>
                <div className="product-slider ">
                    <ProductSlider images={similarPRD} />
                </div>
            </div>
        </section>
    );
};

export default Product;
