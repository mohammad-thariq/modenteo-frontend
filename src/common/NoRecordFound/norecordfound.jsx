import React from 'react';
import './NoRecordFound.css'; // Import CSS for styling the component

const NoRecordFound = () => {
  return (
    <div className="no-record-container">
      {/* <div className="no-record-animation"></div> */}
      <div className="no-record-message">No records found.</div>
    </div>
  );
};

export default NoRecordFound;
