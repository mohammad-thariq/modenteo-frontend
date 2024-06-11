import React, { useEffect, useState } from 'react';
import WebsiteBanner from '../../components/Banner/banner';
import CustomerBenefits from '../../components/CustomerBenefits/customer-benefits';
import Collections from '../../components/Collections/collections';
import Fashion from '../../components/Fashion/fashion';
import Popular from '../../components/Popular/popular';
import CategoryCollection from '../../components/Collections/category-collection';
// import BannerCategory from '../../components/Banner/banner-category';
import { SectionTitle } from '../../common';
import ProductCard from '../../components/Product/product-card';
import { SettingsAPI } from '../../service/settings/settings';
import { useQuery } from 'react-query';
const HomePage = () => {
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
    ];
    const { getSettings, getHomeSettings } = new SettingsAPI();
    const { data: settings } = useQuery(["settings"], getSettings);
    const { data: settingshome } = useQuery(["settings-frontend"], getHomeSettings);
    const [websiteSettings, setwebsiteSettings] = useState([]);
    const [sectionContent, setsectionContent] = useState([]);
    const [homeSettings, sethomeSettings] = useState([]);
    useEffect(() => {
        if (settings && settings?.settings) {
            setwebsiteSettings(settings?.settings);
        }
        if (settingshome) {
            setsectionContent(settingshome);
        }
        if (settings && settings?.home_settings) {
            sethomeSettings(settings?.home_settings);
        }
    }, [settings, settingshome]);
    const getSettingsByType = (type) => {
        return websiteSettings.find(section => section.type === type && section.enabled === 1);
    };
    const renderSection = (sectionname) => {
        let data = homeSettings.find(section => section.after_section === sectionname);
        console.log(data, 'datadata')
        if (data !== undefined) {
            return (
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
            )
        } else {
            return null;
        }

    }
    return (
        <div>
            {getSettingsByType('banner') !== undefined && sectionContent?.banner && <WebsiteBanner images={sectionContent?.banner} />}
            {renderSection('banner')}
            {getSettingsByType('spotlight') !== undefined && sectionContent?.spotlight && <div className='pt-5 pb-5'> <CategoryCollection data={sectionContent?.spotlight} header={getSettingsByType('spotlight')} /></div>}
            {renderSection('spotlight')}
            {getSettingsByType('discount') !== undefined && sectionContent?.discount && <div className='pt-5 pb-5'><Collections data={sectionContent?.discount} header={getSettingsByType('discount')} /></div>}
            {/* <div className='pt-5 pb-5'><BannerCategory /></div> */}
            {renderSection('discount')}
            {getSettingsByType('popular') !== undefined && sectionContent?.popular && <div className='pt-5 pb-5'><Popular data={sectionContent?.popular} header={getSettingsByType('popular')} /></div>}
            {renderSection('popular')}
            {getSettingsByType('fashion') !== undefined && sectionContent?.fashion && <div className='pt-5 pb-5'><Fashion images={sectionContent?.fashion} header={getSettingsByType('fashion')} /></div>}
            {renderSection('fashion')}
            {getSettingsByType('service') !== undefined && sectionContent?.customerservice && <div className='pt-5 pb-5'><CustomerBenefits data={sectionContent?.customerservice} header={getSettingsByType('service')} /> </div>}
            {renderSection('service')}

        </div>
    );
};

export default HomePage;
