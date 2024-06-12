import React, { useState } from "react";
import ProductGallerySlideshow from "./product-gallery-slideshow";

function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 200,
  magnifieWidth = 200,
  zoomLevel = 1.5,
  images,
  index
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [time, settime] = useState('');
  const openModal = () => {
    setshowPopup(true);
    settime(Date.now());

  };
  return (
    <>
      {showPopup && <ProductGallerySlideshow modal={time} index={index} images={images} />}

      <div
        style={{
          position: "relative",
          height: height,
          width: width,
        }}
      >
        <img
          src={src}
          style={{ height: height, width: width }}
          onClick={(e) => { openModal(); }}
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();

            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
          alt={"img"}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
              }px`,

            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    </>
  );
}

const ProductGallery = ({ data }) => {
  let gallery = data?.gallery !== undefined ? data?.gallery.split(',') : []
  const [mainImage, setMainImage] = useState(data?.image);
  const [index, setIndex] = useState(1);

  const handleThumbnailClick = (imageUrl, index) => {
    setMainImage(imageUrl);
    setIndex(index + 1);
  };

  return (
    <div className="col-md-6">
      <div className="product-gallery product-gallery-vertical">
        <div className="row">
          <figure className="product-main-image">
            <ImageMagnifier id="product-zoom" src={mainImage} index={index} images={gallery} />
          </figure>
          <div className="product-image-gallery">
            {gallery.map((product, index) => (
              <img onClick={() => handleThumbnailClick(product, index)} className={`product-gallery-item ${mainImage === product ? "active" : ""}`} src={product} alt={data?.short_name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductGallery;
