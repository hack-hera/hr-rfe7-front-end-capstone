import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { allTrue } from '../../lib/ratingFunctions';

import Ratings from './Ratings';
import Characteristics from './Characteristics';
import ReviewList from './ReviewList';
import AddReview from './AddReview';

const RatingsReviews = ({ data, product, fetch }) => {
  const [filters, setFilters] = useState({ ...allTrue });

  return (
    <Container>
      <h3>Ratings and Reviews</h3>
      <MainContainer>
        <LeftContainer>
          <Ratings data={data} updateFilter={setFilters} filters={filters} />
          <Characteristics data={data} />
        </LeftContainer>
        <RightContainer>
          <ReviewList
            data={data}
            filters={filters}
            addReview={() => console.log('add review')}
            fetch={fetch}
            product={product}
          />
        </RightContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  h3 {
    margin-left: 10px;
    font-size: 16px;
    font-weight: normal;
  }
`;

const MainContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export default RatingsReviews;
