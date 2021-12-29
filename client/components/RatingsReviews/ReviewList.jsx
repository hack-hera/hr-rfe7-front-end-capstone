import React from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

import { Button } from '../Shared/Form';

const ReviewList = ({
  reviews,
  filters,
  reviewsShowing,
  showMore,
  addReview,
  reFetch,
  product,
}) => {
  let display = reviews.filter((r) => filters[r.rating]);
  let showing = Math.min(reviewsShowing, display.length);

  return (
    <Container>
      <Header>
        Showing {showing} of {display.length} reviews | sorted by
      </Header>
      {display.slice(0, reviewsShowing).map((r, i) => (
        <ReviewItem review={r} key={i} reFetch={reFetch} product={product} />
      ))}
      {showing < display.length && <Button onClick={showMore}>Show More</Button>}
      <Button onClick={addReview}>
        Add a Review &nbsp;<b>+</b>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding: 0px 20px 20px 10px;
`;

export default ReviewList;
