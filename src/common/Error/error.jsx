import React from 'react';
import './Error.css'; // Import CSS for styling the error component

const Error = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <span className="material-icons">error</span>
      </div>
      <div className="error-message">{message}</div>
      <button className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

export default Error;
