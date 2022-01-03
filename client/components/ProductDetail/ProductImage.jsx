import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../Shared/Modal.jsx';

const ProductImage = (props) => {

  if (props.currentPhoto.url) {
    return (
      <Image
        id = "image"
        src={props.currentPhoto.url}
      />
    );
  } else {
    return (
      <Image
        id = "image"
        src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
      />
    );
  }
};

const Image = styled.img`
  max-width: 400px;
  max-height: 440px;
  cursor: zoom-in;
`;

export default ProductImage;