import React, { useState, useEffect } from "react";
import { Breadcrumb, DangerousHTML, PageTitle } from "../../common";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PagesAPI } from "../../service";
const { getPagebySlug } = new PagesAPI();
const fetchPageContent = (slug) => () => getPagebySlug(slug);

const WebsitePages = () => {
  const { slug } = useParams();
  const { data } = useQuery("page-content", fetchPageContent(slug), {
    enabled: slug != null ? true : false,
  });

  const [pageContent, setpageContent] = useState({});

  useEffect(() => {
    setpageContent(data?.data);
    console.log(data?.data, "data");
  }, [data]);

  return (
    <>
      <PageTitle title="WebSite Page" />
      <div className="cart page-content">
        <Breadcrumb />
        <div className="container">
          <div className="desc-content">
            <h3>{pageContent?.title}</h3>
            <DangerousHTML html={pageContent?.content} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsitePages;
