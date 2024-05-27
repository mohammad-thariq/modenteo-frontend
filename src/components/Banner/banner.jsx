import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/banner.css'

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
                        {images.map((image, index) => (
                            <div key={index} className={index === currentIndex ? 'slider-item active' : "slider-item"}>
                                <img src={image} alt={index} className="banner-img" />
                                <div className="banner-content">

                                    <p className="banner-subtitle">Trending item</p>

                                    <h2 className="banner-title">Women's latest fashion sale</h2>

                                    <p className="banner-text">
                                        starting at &#36; <b>20</b>.00
                                    </p>

                                    <a href="/" className="banner-btn">Shop now</a>

                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={index === currentIndex ? 'active' : ''}
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
