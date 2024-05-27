import React from "react";
import '../../styles/individualproduct.css';
import ProductSlider from "../Slider/product-slider";
import ProductDetailsTab from './product-details-tab';
import ProductDetails from "./product-details";
import ProductGallery from "./product-gallery";
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

const Product = () => {
    return (
        <section className="cat-outer-section">
            <div className="container">
                <div className="product-details-top">
                    <div className="row">
                        <ProductGallery images={productImages} />
                        <ProductDetails />
                    </div>
                    <ProductDetailsTab />
                </div>
                <div className="product-slider">
                    <h2 className='sectitle'>Similar Products</h2>
                    <ProductSlider images={productImages} />
                </div>
            </div>
        </section>
    );
};

export default Product;
