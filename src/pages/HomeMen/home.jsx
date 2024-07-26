import React, { useEffect, useState, useCallback } from "react";
import WebsiteBanner from "../../components/Banner/banner";
import CustomerBenefits from "../../components/CustomerBenefits/customer-benefits";
import Collections from "../../components/Collections/collections";
import Fashion from "../../components/Fashion/fashion";
import Popular from "../../components/Popular/popular";
import CategoryCollection from "../../components/Collections/category-collection";
import { PageTitle, SectionTitle } from "../../common";
import ProductCard from "../../components/Product/product-card";
import { SettingsAPI } from "../../service/settings/settings";
import { useQuery, useMutation } from "react-query";
import { ManageProductsApi } from "../../service";
import { Link } from "react-router-dom";

const HomeMenPage = () => {
  const { getSettingsCat, getCatSettings } = new SettingsAPI();
  const { data: settings } = useQuery(["settings", "men"], getSettingsCat);
  const { data: settingshome } = useQuery(["settings-frontend", "men"], getCatSettings);

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
    (type, value) => {
      const key = type + value;
      if (productsData[key]) {
        return;
      }
      if (type === "sub_category") {
        productSubcategory.mutate(value, {
          onSuccess: (data) => {
            setProductsData((prev) => ({ ...prev, [key]: data.products }));
          },
        });
      }
      if (type === "main_category") {
        productCategory.mutate(value, {
          onSuccess: (data) => {
            setProductsData((prev) => ({ ...prev, [key]: data.products }));
          },
        });
      }
      if (type === "collection") {
        productCollection.mutate(value, {
          onSuccess: (data) => {
            setProductsData((prev) => ({ ...prev, [key]: data.products }));
          },
        });
      }
      if (type === "brands") {
        productBrand.mutate(value, {
          onSuccess: (data) => {
            setProductsData((prev) => ({ ...prev, [key]: data.products }));
          },
        });
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
    homeSettings.forEach((item) => {
      getProducts(item.type, item.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeSettings]);

  const renderSection = (sectionname) => {
    let data = homeSettings.filter(
      (section) => section.after_section === sectionname
    );
    if (data.length > 0) {
      return data.map((item, key) => {
        const products = productsData[item.type + item.value] || [];
        if (products.length > 0) {
          return (
            <div className="our-collections pt-5" key={key}>
              <SectionTitle title={item.title} subtitle={item.description} />
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="products mb-3">
                      <div className="row justify-content-center">
                        {products.map((data, key) => (
                          <div
                            key={key}
                            className="col-6 col-md-3 col-lg-3 col-xl-3"
                          >
                            <ProductCard key={key} data={data} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {item.view_more && <Link className="view_more" to={item.view_more}>View More</Link>}
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

export default HomeMenPage;
