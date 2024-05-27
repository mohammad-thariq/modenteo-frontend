import React, { useState } from 'react';
import './ColorPalette.css';

const ColorPalette = ({ colors, selectedColor, setSelectedColor }) => {

    return (
        <div className="color-palette">
            <div className="colors">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`color ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ColorPalette;
