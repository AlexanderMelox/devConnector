import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <div>
    <img
      src={spinner}
      alt="Loading"
      style={{
        width: 200,
        margin: 'auto',
        display: 'block'
      }} />
  </div>
);

export default Spinner;