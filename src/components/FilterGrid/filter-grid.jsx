import React, { useState } from 'react';
const FilterGrid = ({ itemsPerPageCount, totalCount }) => {
    const [sortOption, setSortOption] = useState('popularity');
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        console.log(`Selected sort option: ${e.target.value}`);
    };

    return (
        <div className="toolbox">
            <div className="toolbox-left">
                <div className="toolbox-info">
                    Showing <span>{itemsPerPageCount} of {totalCount}</span> Products
                </div>
            </div>
            <div className="toolbox-right">
                <div className="toolbox-sort">
                    <label htmlFor="sortby">Sort by:</label>
                    <div className="select-custom">
                        <select name="sortby" id="sortby" className="form-control" value={sortOption} onChange={handleSortChange}>
                            <option value="popularity">Most Popular</option>
                            <option value="rating">Most Rated</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FilterGrid;