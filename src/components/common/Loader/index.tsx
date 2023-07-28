import React from 'react';

const Loader = () => {
  return (
    <div
      className="w-full h-screen flex"
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <progress className="progress w-56" />
    </div>
  );
};

export default Loader;
