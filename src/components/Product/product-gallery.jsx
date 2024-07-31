import React, { useEffect, useState, useRef } from "react";
import ProductGallerySlideshow from "./product-gallery-slideshow";

function ImageZoom({
  src,
  width,
  height,
  zoomLevel = 2,
  images,
  index,
  showModal,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [showZoom, setShowZoom] = useState(false);
  const [showPopup, setShowPopup] = useState(showModal);
  const [time, setTime] = useState("");
  const imgRef = useRef(null);

  const openModal = () => {
    setShowPopup(true);
    setTime(Date.now());
  };

  useEffect(() => {
    setShowPopup(showModal);
  }, [showModal]);

  const handleMouseMove = (e) => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const offsetY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      setXY([offsetX / rect.width, offsetY / rect.height]);
    }
  };

  return (
    <>
      {showPopup && (
        <ProductGallerySlideshow
          modal={time}
          index={index}
          images={images}
          modalClose={() => setShowPopup(false)}
        />
      )}

      <div
        style={{
          position: "relative",
          height: height,
          width: width,
          overflow: "hidden",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          style={{
            height: height,
            width: width,
            transform: showZoom ? `scale(${zoomLevel})` : "scale(1)",
            transformOrigin: `${x * 100}% ${y * 100}%`,
            transition: "transform 0.2s ease",
            cursor: showZoom ? "zoom-out" : "zoom-in",
          }}
          onClick={openModal}
          onMouseEnter={() => {
            setShowZoom(true);
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setShowZoom(false);
          }}
          alt="img"
        />
      </div>
    </>
  );
}

const ProductGallery = ({ data, variantImage }) => {
  let gallery =
    data?.gallery !== undefined
      ? data?.gallery?.split(",")
      : [
          "https://placehold.co/89x129",
          "https://placehold.co/89x129",
          "https://placehold.co/89x129",
          "https://placehold.co/89x129",
        ];
  gallery?.push(data?.image);

  const [mainImage, setMainImage] = useState(data?.image);
  const [index, setIndex] = useState(1);

  const handleThumbnailClick = (imageUrl, index) => {
    setMainImage(imageUrl);
    setIndex(index + 1);
  };

  useEffect(() => {
    if (variantImage !== undefined) {
      setMainImage(variantImage);
    } else {
      setMainImage(data?.image);
    }
  }, [data, variantImage]);

  

  return mainImage !== "" ? (
    <div className="col-md-6">
      <div className="product-gallery product-gallery-vertical">
        <div className="row">
          <figure className="product-main-image">
            <ImageZoom
              id="product-zoom"
              src={mainImage || 'https://placehold.co/400x590'}
              index={index}
              images={gallery}
              showModal={false}
            />
          </figure>
          <div className="product-image-gallery">
            {gallery?.map((product, index) => (
              <img
                onMouseOver={() => handleThumbnailClick(product, index)}
                onClick={() => handleThumbnailClick(product, index)}
                className={`product-gallery-item cursor-pointer ${mainImage === product ? "active" : ""}`}
                src={product}
                alt={data?.short_name}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProductGallery;
