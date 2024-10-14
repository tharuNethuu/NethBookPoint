import React from 'react';
import { ScaleLoader } from 'react-spinners';
import './LoadingComponent.css';


const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <img src="/loading.gif" alt="Loading..." className="loading-gif" />
      </div>
  );
};

export default LoadingComponent;
