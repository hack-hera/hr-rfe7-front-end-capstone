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
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      {showModal === true && (
        <AddReview
          product={product}
          meta={data}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            setShowModal(false);
            fetch({
              product_id: product.id,
              page: 1,
              count: 100,
              sort: 'newest',
            });
          }}
        />
      )}
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
            fetch={fetch}
            addReview={() => setShowModal(true)}
            product={product}
          />
        </RightContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
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
