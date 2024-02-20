import React from 'react';
import gif from './loading.gif';

const Spinner = () => {
    return (
      <div className='text-center'>
        <img className='my-3' src={gif} alt='gif'></img>
      </div>
    )
}

export default Spinner