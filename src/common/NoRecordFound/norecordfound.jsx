import React from 'react';
import './NoRecordFound.css'; // Import CSS for styling the component

const NoRecordFound = ({message, description}) => {
  const defaulMessage = 'No Products Found'
  const defauldescription = "Explore other categories to find a wide range of products."
  return (
    <div className="no-record-container">
      <img src='/assets/svg/not_found_data.svg' alt='No data found' className='no-record-img'/>
      <div className="no-record-message">{message || defaulMessage}</div>
      <div className="no-record-description">{description || defauldescription}</div>
    </div>
  );
};

export default NoRecordFound;
