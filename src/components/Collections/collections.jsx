import React from "react";
const Collections = ({ data, header }) => {
  return (
    <div className="container" style={{ height: "500px" }}>
      {data.map((item, index) => {
        return (
          <div className="testimonials-box" key={index}>
            <div className="cta-container">
              <img src={item.image} alt={item?.title} className="cta-banner" />

              {/* <img src={item?.image} alt={item?.title} className="cta-banner" /> */}
              <a href={item?.page_url} className="cta-content">
                <p className="discount">{item?.title}</p>

                <h2 className="cta-title">{item?.sub_title}</h2>

                <p className="cta-text">{item?.description}</p>

                <button className="cta-btn">{item?.button_name}</button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Collections;
