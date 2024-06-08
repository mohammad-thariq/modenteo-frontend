import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/product-slider.css';
import ProductCard from '../Product/product-card';

const ProductSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 4 < images.length) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return images.length - 4;
      }
    });
  };


  const [currentIndexmobile, setCurrentIndexmobile] = useState(0);

  const nextSlidemobile = () => {
    setCurrentIndexmobile((prevIndex) => {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  const prevSlidemobile = () => {
    setCurrentIndexmobile((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return images.length - 1;
      }
    });
  };

  return (


    window.innerWidth >= 700 ? (
      <div className="container slider-container">
        <div className="slides">
          {images.slice(currentIndex, currentIndex + 4).map((image, index) => (
            <div key={index} className="slide-item">
              <ProductCard data={image} />
            </div>
          ))}
        </div>
        {images.length > 4 && <>
          <button className="prev-btn" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </>}
      </div>) : (
      <div className="mobile-slider">
        <div className="slides">
          <div className="slide-item">
            <ProductCard data={images[currentIndexmobile]} />
          </div>
        </div>
        {images.length > 4 && <>
          <button className="prev-btn" onClick={prevSlidemobile}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextSlidemobile}>
            <FaChevronRight />
          </button>
        </>}
      </div>
    )

  );
};

export default ProductSlider;
