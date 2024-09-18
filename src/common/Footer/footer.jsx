import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { mailOutline, callOutline, locationOutline } from "ionicons/icons";
import { SocialFooter } from "../Social/social";
import { ManageCategoriesApi, PagesAPI } from "../../service";
import { useQuery } from "react-query";
import { MasterCardIcon } from "../illustration/mastercard";
import { PaypalIcon } from "../illustration/paypal";
import { VisaIcon } from "../illustration/visa";
import { VappsIcon } from "../illustration/vapps";
import { FakutraIcon } from "../illustration/fakutra";
import { AmericanExpressIcon } from "../illustration/americanExpress";

const WebsiteFooter = () => {
  const { productMenuSeasons } = new ManageCategoriesApi();
  const { getPages } = new PagesAPI();
  const { data: seasons } = useQuery("footer-seasons", productMenuSeasons);
  const { data: pages } = useQuery("pages", getPages);
  const [seasonCollections, setSeasonalCollections] = useState([]);
  const [companyPages, setCompanyPages] = useState([]);
  const [servicePages, setServicePages] = useState([]);

  useEffect(() => {
    if (seasons && seasons.response && Array.isArray(seasons.response)) {
      setSeasonalCollections(seasons.response);
    }
    if (pages && pages.pages && Array.isArray(pages.pages)) {
      const companyPage = [];
      const servicePage = [];
      pages.pages.forEach((page) => {
        if (page.page_type === "company") {
          companyPage?.push(page);
        } else if (page.page_type === "service") {
          servicePage?.push(page);
        }
      });
      setCompanyPages(companyPage);
      setServicePages(servicePage);
    }
  }, [seasons, pages]);

  return (
    <footer>
      <div className="footer-nav">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Popular Collections</h2>
            </li>
            {seasonCollections.length > 0 &&
              seasonCollections.map((menu, key) => (
                <li className="footer-nav-item" key={key}>
                  <a
                    href={`/products?slug=${menu.slug}`}
                    className="footer-nav-link"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
          </ul>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Our Company</h2>
            </li>
            {companyPages.length > 0 &&
              companyPages.map((page, key) => (
                <li className="footer-nav-item" key={key}>
                  <a href={`/page/${page.slug}`} className="footer-nav-link">
                    {page.title}
                  </a>
                </li>
              ))}
            <br />
            <li className="footer-nav-item">
              <h2 className="nav-title">Payment Options</h2>
            </li>
            <li className="social-link" style={{gap: '5px'}}>
              <MasterCardIcon />
              <PaypalIcon />
              <VisaIcon />
              <VappsIcon />
              <FakutraIcon />
              <AmericanExpressIcon />
            </li>
          </ul>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Services</h2>
            </li>
            {servicePages.length > 0 &&
              servicePages.map((page, key) => (
                <li className="footer-nav-item" key={key}>
                  <a href={`/page/${page.slug}`} className="footer-nav-link">
                    {page.title}
                  </a>
                </li>
              ))}
            <br />
            <li className="footer-nav-item">
              <h2 className="nav-title">Follow Us</h2>
            </li>
            <li>
              <SocialFooter />
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Contact</h2>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <IonIcon icon={locationOutline} />
              </div>
              <address className="content">
                419 State 414 Rte Beaver Dams, New York(NY), 14812, USA
              </address>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <IonIcon icon={callOutline} />
              </div>
              <a href="tel:+607936-8058" className="footer-nav-link">
                (607) 936-8058
              </a>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <IonIcon icon={mailOutline} />
              </div>
              <a href="mailto:example@gmail.com" className="footer-nav-link">
                example@gmail.com
              </a>
            </li>
          </ul>
          <ul className="footer-nav-list"></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo-mini.png"}
            className="site-img"
            alt="Modenteo Logo"
          />
          <p className="copyright">
            Copyright &copy; <a href="/dashboard">Modenteo</a> all rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default WebsiteFooter;
