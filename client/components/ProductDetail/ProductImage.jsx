import React from 'react';
import styled from 'styled-components';
import { Modal } from '../Shared/Modal.jsx';

const ProductImage = (props) => {

  return (
    <Image
      id = "image"
      src={props.currentPhoto.url}
    />
  );
};

const Image = styled.img`
  max-width: 400px;
  max-height: 440px;
  cursor: zoom-in;
`;

export default ProductImage;