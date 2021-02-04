import React from 'react';
import propTypes from 'prop-types';

const PostImages = ({ images }) => {
  return <div>구현중...</div>;
};

PostImages.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      src: propTypes.string
    })
  )
};

export default PostImages;
