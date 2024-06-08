import React from 'react';
import WebsiteBanner from '../../components/Banner/banner';
import CustomerBenefits from '../../components/CustomerBenefits/customer-benefits';
import Collections from '../../components/Collections/collections';
import Fashion from '../../components/Fashion/fashion';
import Popular from '../../components/Popular/popular';
import CategoryCollection from '../../components/Collections/category-collection';
import BannerCategory from '../../components/Banner/banner-category';
import { SectionTitle } from '../../common';
import ProductCard from '../../components/Product/product-card';
const HomePage = () => {
    const images = [
        process.env.PUBLIC_URL + "/assets/home/images/banner-1.jpg",
        process.env.PUBLIC_URL + "/assets/home/images/banner-2.jpg",
        process.env.PUBLIC_URL + "/assets/home/images/banner-3.jpg",
    ];
    const images1 = [
        process.env.PUBLIC_URL + "/assets/images/kids/1.png",
        process.env.PUBLIC_URL + "/assets/images/kids/2.png",
        process.env.PUBLIC_URL + "/assets/images/kids/3.png",
        process.env.PUBLIC_URL + "/assets/images/kids/4.png",
        process.env.PUBLIC_URL + "/assets/images/kids/5.png",
        process.env.PUBLIC_URL + "/assets/images/kids/1.png",
        process.env.PUBLIC_URL + "/assets/images/kids/2.png",
        process.env.PUBLIC_URL + "/assets/images/kids/3.png",
        process.env.PUBLIC_URL + "/assets/images/kids/4.png",
        process.env.PUBLIC_URL + "/assets/images/kids/5.png",
    ];
    const productImages = [
        {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/1.jpg",
        },
        {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/2.jpg",
        }, {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/3.jpg",
        },
        {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/4.jpg",
        }, {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-1.jpg",
        },
        {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-2.jpg",
        },
        {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-3.jpg",
        }, {
            name: "Product 1",
            category: "Cat 1",
            old_price: 100,
            current_price: 50,
            image: process.env.PUBLIC_URL + "/assets/home/images/products/clothes-4.jpg",
        }
    ]
    return (
        <div>
            <WebsiteBanner images={images} />
            <div className='pt-5 pb-5'> <CategoryCollection /></div>
            <div className='pt-5 pb-5'> <Collections /></div>


            <div className='pt-5 pb-5'><BannerCategory /></div>

            <div className="our-collections pt-5 pb-5">
                <SectionTitle title="Our Collections" subtitle="Check out most promising product bought by our buyers" />
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='products mb-3'>
                                <div className='row justify-content-center'>
                                    {productImages.map((data, key) => {
                                        return (<div key={key} className="col-6 col-md-3 col-lg-3 col-xl-3">
                                            <ProductCard key={key} data={data} />
                                        </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-5 pb-5'>
                <Popular />
            </div>
            <div className='pt-5 pb-5'>
                <Fashion images={images1} />
            </div>
            <div className='pt-5 pb-5'>
                <CustomerBenefits />
            </div>
        </div>
    );
};

export default HomePage;
