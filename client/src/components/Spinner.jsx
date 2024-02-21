import React from 'react';
import gif from './loading1.gif';

const Spinner = () => {
    return (
      <div className='flex justify-center items-center'>
        <img className='my-3' src={gif} alt='gif' height={300} width={300}></img>
      </div>
    )
}

export default Spinner