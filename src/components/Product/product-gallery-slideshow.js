import React, { useEffect, useState } from 'react';
import '../../styles/gallery.css';

const ProductGallerySlideshow = ({ images, index, modal }) => {
    const [slideIndex, setSlideIndex] = useState(index);

   
    const closeModal = () => {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.getElementById("myHeader").style.display = "block";
        document.getElementById("galleryslideshowMyModal").style.display = "none";

    };

    const plusSlides = (n) => {
        showSlides(slideIndex + n);
    };

    const showSlides = (n) => {
        let newSlideIndex = n;
        if (n > images.length) { newSlideIndex = 1 }
        if (n < 1) { newSlideIndex = images.length }
        setSlideIndex(newSlideIndex);
    };

    useEffect(() => {
        document.getElementById("galleryslideshowMyModal").style.display = "block";
        document.getElementById("myHeader").style.display = "none";
        showSlides(index);
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    }, [modal]);

    return (
        <div id="galleryslideshowMyModal" className="galleryslideshowModal">
            <span className="galleryslideshowClose galleryslideshowCursor" onClick={closeModal}>&times;</span>
            <div className="galleryslideshowModalContent">
                <div className="galleryslideshowMySlides">
                    <img src={images[slideIndex - 1].image} alt={images[slideIndex - 1].name} className="galleryslideshowImage" />
                </div>
            </div>
            <a className="galleryslideshowPrev" onClick={() => plusSlides(-1)}>&#10094;</a>
            <a className="galleryslideshowNext" onClick={() => plusSlides(1)}>&#10095;</a>
        </div>
    );
};

export default ProductGallerySlideshow;
