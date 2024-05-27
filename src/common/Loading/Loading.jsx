import React from 'react';
import './Loading.css'; // Import CSS for styling the spinner

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
