import React, { useState } from "react";

function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 200,
    magnifieWidth = 200,
    zoomLevel = 1.5
}) {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    return (
        <div
            style={{
                position: "relative",
                height: height,
                width: width
            }}
        >
            <img
                src={src}
                style={{ height: height, width: width }}
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
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                }}
            ></div>
        </div>
    );
}

const ProductGallery = ({images}) => {
    const [mainImage, setMainImage] = useState(images[0].image);

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    return (
        <div className="col-md-6">
            <div className="product-gallery product-gallery-vertical">
                <div className="row">
                    <figure className="product-main-image">
                        <ImageMagnifier
                            id="product-zoom"
                            src={mainImage}
                        />
                    </figure>
                    <div className="product-image-gallery">
                        {images.map((product, index) => (
                            <a
                                key={index}
                                className={`product-gallery-item ${mainImage === product.image ? 'active' : ''}`}
                                href="#"
                                onClick={() => handleThumbnailClick(product.image)}
                            >
                                <img src={product.image} alt={product.name} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductGallery;