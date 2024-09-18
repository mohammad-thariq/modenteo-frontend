import React from 'react';
import './Loading.css'; // Import CSS for styling the spinner

const Loading = () => {
  return (
    <div className="loading-container">
      <img src='/assets/images/loading.gif' alt='loading'/>
    </div>
  );
};

export default Loading;
