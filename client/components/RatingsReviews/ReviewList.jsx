import React from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, showMore }) => {
  return (
    <Container>
      {reviews.map((r, i) => (
        <ReviewItem review={r} key={i} />
      ))}
      <button onClick={showMore}>Show More</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default ReviewList;
