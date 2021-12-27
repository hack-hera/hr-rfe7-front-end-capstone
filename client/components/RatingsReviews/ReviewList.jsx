import React from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, showMore }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <Container>
        <h3>No Reviews</h3>
      </Container>
    );
  }

  reviews.sort((a, b) => b.summary.length - a.summary.length);
  let display = reviews.slice(0, 5) || [];

  return (
    <Container>
      {display.map((r, i) => (
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
