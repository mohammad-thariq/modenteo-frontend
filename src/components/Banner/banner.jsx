import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../styles/banner.css";
const WebsiteBanner = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  return (
    <main>
      <div className="banner carousel">
        <div className="container">
          <button className="prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
          <div className="slider-container has-scrollbar">
            {images.map((item, index) => (
              <div
                key={index}
                className={
                  index === currentIndex ? "slider-item active" : "slider-item"
                }
              >
                <img src={item.image} alt={index} className="banner-img" />
                {/* <img src={process.env.PUBLIC_URL + "/assets/home/images/banner-1.jpg"} alt={index} className="banner-img" /> */}
                <div className="banner-content">
                  <p className="banner-subtitle">{item?.title}</p>

                  <h2 className="banner-title">{item?.sub_title}</h2>

                  <p className="banner-text">{item?.description}</p>

                  <a href={item?.page_url} className="banner-btn">
                    {item?.button_name}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? "active" : ""}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WebsiteBanner;
