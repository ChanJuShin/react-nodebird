import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay,
  Global,
  Header,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  CloseBtn
} from './styles';
import { backUrl } from '../../config/config';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((y) => (
              <ImgWrapper key={y.src}>
                <img
                  src={`${y.src.replace(/\/thumb\//, '/original/')}`}
                  alt={y.src}
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImagesZoom;
