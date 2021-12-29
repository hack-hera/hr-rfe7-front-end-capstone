import React from 'react';
import styled from 'styled-components';

const ProductImage = (props) => {
  return (
    <Image
      src={props.selectedPhoto.url}
    />
  );
};

const Image = styled.img`
  max-width: 400px;
  max-height: 440px;
  cursor: zoom-in;
`;

export default ProductImage;