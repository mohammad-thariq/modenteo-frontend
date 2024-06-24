import React, { useCallback, useEffect, useState } from "react";
import "../../styles/gallery.css";
const ProductGallerySlideshow = ({ images, index, modal, modalClose }) => {
  const [slideIndex, setSlideIndex] = useState(index);

  const closeModal = () => {
    modalClose();
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.getElementById("myHeader").style.display = "block";
    document.getElementById("galleryslideshowMyModal").style.display = "none";
  };

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const showSlides = useCallback(
    (n) => {
      let newSlideIndex = n;
      if (n > images.length) {
        newSlideIndex = 1;
      }
      if (n < 1) {
        newSlideIndex = images.length;
      }
      setSlideIndex(newSlideIndex);
    },
    [images.length]
  );

  useEffect(() => {
    document.getElementById("galleryslideshowMyModal").style.display = "block";
    document.getElementById("myHeader").style.display = "none";
    showSlides(index);
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  }, [index, modal, showSlides]);

  return (
    <div id="galleryslideshowMyModal" className="galleryslideshowModal">
      <span
        className="galleryslideshowClose galleryslideshowCursor"
        onClick={closeModal}
      >
        &times;
      </span>
      <div className="galleryslideshowModalContent">
        <div className="galleryslideshowMySlides">
          <img
            src={images[slideIndex - 1]}
            alt={images[slideIndex - 1]}
            className="galleryslideshowImage"
          />
        </div>
      </div>
      <span className="galleryslideshowPrev" onClick={() => plusSlides(-1)}>
        &#10094;
      </span>
      <span className="galleryslideshowNext" onClick={() => plusSlides(1)}>
        &#10095;
      </span>
    </div>
  );
};

export default ProductGallerySlideshow;
