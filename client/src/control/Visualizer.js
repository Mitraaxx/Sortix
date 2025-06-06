import React from 'react';
import "./Visualizer.css";

function Visualizer({ array }) {
  return (
    <div className='array-container'>
      {array.map((item, index) => (
        <div key={index} className='bar' style={{ height: `${item}px` }}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default Visualizer;
