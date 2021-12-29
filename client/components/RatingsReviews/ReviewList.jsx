import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

import { Button } from '../Shared/Form';

const ReviewList = ({ data, filters, addReview, fetch, product }) => {
  let display = data.reviews.filter((r) => filters[r.rating]);
  const [showing, setShowing] = useState(Math.min(2, display.length));

  useEffect(() => {
    setShowing(Math.min(2, display.length));
  }, [product.id]);

  return (
    <Container>
      <Header>
        Showing {showing} of {display.length} reviews | sorted by
      </Header>
      {display.slice(0, showing).map((r, i) => (
        <ReviewItem review={r} key={i} reFetch={fetch} product={product} />
      ))}
      {showing < display.length && (
        <Button onClick={() => setShowing(showing + 2)}>Show More</Button>
      )}
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
