import React from "react";
import "../../styles/popular.css";
import { SectionTitle } from "../../common";
const Popular = ({ data, header }) => {
  return (
    <div className="container" style={{ marginBottom: "10px" }}>
      <SectionTitle title={header?.title} subtitle={header?.description} />
      <div className="row">
        {data.map((item, key) => {
          return (
            <div className="col-md-6 col-lg-6" key={key}>
              <div className="member">
                <a href={item?.page_url}>
                  <img
                    src={item.image}
                    className="img-responsive img-thumbnail"
                    alt={item?.title}
                  />
                </a>
                <div className="name">
                  <a
                    href={item?.page_url}
                    style={{
                      fontSize: "22px",
                      fontWeight: "400",
                      marginBottom: "10px",
                    }}
                  >
                    <b>
                      {item?.title}
                      <span></span>
                    </b>
                  </a>
                  {item?.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
