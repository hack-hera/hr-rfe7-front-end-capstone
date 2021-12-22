import React from 'react';
import ReactDOM from 'react-dom';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';

const ProductDetail = () => {
  return (
    <Header>Product Detail</Header>
  );
};

const Header = styled.h1`
  color: ${COLORS.logo};
`;

export default ProductDetail;