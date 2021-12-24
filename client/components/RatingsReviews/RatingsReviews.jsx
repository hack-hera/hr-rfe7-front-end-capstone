import React from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';

const RatingsReviews = ({ product, updateProduct }) => {

  return (
    <Container>
      <h1>Ratings and Reviews</h1>
      <button onClick={() => updateProduct(37313)}>Load Product 37313</button>
    </Container>
  );
};



const Container = styled.div`
  color: ${COLORS.hover};
`;

export default RatingsReviews;