import React, { useEffect, useState, useCallback } from "react";
import WebsiteBanner from "../../components/Banner/banner";
import CustomerBenefits from "../../components/CustomerBenefits/customer-benefits";
import Collections from "../../components/Collections/collections";
import Fashion from "../../components/Fashion/fashion";
import Popular from "../../components/Popular/popular";
import CategoryCollection from "../../components/Collections/category-collection";
import { Loading, PageTitle, SectionTitle } from "../../common";
import ProductCard from "../../components/Product/product-card";
import { SettingsAPI } from "../../service/settings/settings";
import { useQuery, useMutation } from "react-query";
import { ManageProductsApi } from "../../service";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { getSettings, getHomeSettings } = new SettingsAPI();
  const { data: settings } = useQuery("settings", getSettings);
  const { data: settingshome } = useQuery("settings-frontend", getHomeSettings);

  const [websiteSettings, setWebsiteSettings] = useState([]);
  const [sectionContent, setSectionContent] = useState([]);
  const [homeSettings, setHomeSettings] = useState([]);
  const [productsData, setProductsData] = useState({});

  const {
    productsByCategory,
    similarProducts,
    productsByCollection,
    productsByBrand,
  } = new ManageProductsApi();

  const productCategory = useMutation(productsByCategory);
  const productSubcategory = useMutation(similarProducts);
  const productCollection = useMutation(productsByCollection);
  const productBrand = useMutation(productsByBrand);

  useEffect(() => {
    if (settings && settings.settings) {
      setWebsiteSettings(settings.settings);
    }
    console.log(settingshome, 'settingshome')
    if (settingshome) {
      setSectionContent(settingshome);
    }
    if (settings && settings.home_settings) {
      setHomeSettings(settings.home_settings);
    }
  }, [settings, settingshome]);

  const getSettingsByType = (type) => {
    return websiteSettings.find(
      (section) => section.type === type && section.enabled === 1
    );
  };
  const getProducts = useCallback(
    async (type, value) => {
      const key = type + value;
      if (productsData[key]) {
        return;
      }
      try {
        let data;
        if (type === "sub_category") {
          data = await productSubcategory.mutateAsync(value);
        }
        if (type === "main_category") {
          data = await productCategory.mutateAsync(value);
        }
        if (type === "collection") {
          data = await productCollection.mutateAsync(value);
        }
        if (type === "brands") {
          data = await productBrand.mutateAsync(value);
        }
        if (data) {
          setProductsData((prev) => ({ ...prev, [key]: data.products }));
        }
      } catch (error) {
        console.error(`Error fetching products for ${type} ${value}:`, error);
      }
    },
    [
      productSubcategory,
      productCategory,
      productCollection,
      productBrand,
      productsData,
    ]
  );


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const promises = homeSettings.map((item) => getProducts(item.type, item.value));
      await Promise.all(promises);
      setLoading(false);
    };
  
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeSettings]);
  const [loading, setLoading] = useState(true);


  const renderSection = (sectionname) => {
    let data = homeSettings.filter(
      (section) => section.after_section === sectionname
    );
    if (data.length > 0) {
      return data.map((item, key) => {
        const products = productsData[item.type + item.value] || [];
        console.log(`Products for ${item.type} ${item.value}:`, products);
  
        // Slice the products array to only show the first 8 items
        if (products.length > 0) {
          return (
            <div className="our-collections pt-5" key={key}>
              <SectionTitle title={item.title} subtitle={item.description} />
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="products mb-3">
                      <div className="row justify-content-center">
                        {products.slice(0, 8).map((data, index) => (
                          <div
                            key={index}
                            className="col-6 col-md-3 col-lg-3 col-xl-3"
                          >
                            <ProductCard key={index} data={data} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {item.view_more && (
                  <Link className="view_more" to={item.view_more}>
                    View More
                  </Link>
                )}
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };
  
  if (loading) {
    return <Loading />;
  }
  else
    return (
      <div>
        <PageTitle title="Fashion Store For Fashioned People" />
        {getSettingsByType("banner") && sectionContent?.banner && (
          <WebsiteBanner images={sectionContent.banner} />
        )}
        {renderSection("banner")}
        {getSettingsByType("spotlight") && sectionContent?.spotlight && (
          <div className="pt-5 pb-5">
            <CategoryCollection
              data={sectionContent.spotlight}
              header={getSettingsByType("spotlight")}
            />
          </div>
        )}
        {renderSection("spotlight")}
        {getSettingsByType("discount") && sectionContent?.discount && (
          <div className="pt-5 pb-5">
            <Collections
              data={sectionContent.discount}
              header={getSettingsByType("discount")}
            />
          </div>
        )}
        {renderSection("discount")}
        {getSettingsByType("popular") && sectionContent?.popular && (
          <div className="pt-5 pb-5">
            <Popular
              data={sectionContent.popular}
              header={getSettingsByType("popular")}
            />
          </div>
        )}
        {renderSection("popular")}
        {getSettingsByType("fashion") && sectionContent?.fashion && (
          <div className="pt-5 pb-5">
            <Fashion
              images={sectionContent.fashion}
              header={getSettingsByType("fashion")}
            />
          </div>
        )}
        {renderSection("fashion")}
        {getSettingsByType("service") && sectionContent?.customerservice && (
          <div className="pt-5 pb-5">
            <CustomerBenefits
              data={sectionContent.customerservice}
              header={getSettingsByType("service")}
            />
          </div>
        )}
        {renderSection("service")}
      </div>
    );
};

export default HomePage;
