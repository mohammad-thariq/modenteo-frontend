import React from 'react';
import '../../styles/fashion.css';
import { SectionTitle } from '../../common';

const Fashion = ({ images, interval = 3000 }) => {
    return (
        <div className='kids-fashion'>
            <SectionTitle title="Kids Fashion" subtitle="Discover everything you need for your kids" />
            <div className="product-slider">
                <div className="product-images">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fashion;
