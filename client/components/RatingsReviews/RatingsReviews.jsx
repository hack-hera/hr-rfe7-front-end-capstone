import React, { Component } from 'react';
import styled from 'styled-components';
import Ratings from './Ratings';
import Characteristics from './Characteristics';
import ReviewList from './ReviewList';

class RatingsReviews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reviewMeta, reviews } = this.props;

    return (
      <Container>
        <h3>Ratings and Reviews</h3>
        <ReviewContainer>
          <LeftContainer>
            <Ratings meta={reviewMeta} />
            <Characteristics meta={reviewMeta} />
          </LeftContainer>
          <MainContainer>
            <ReviewList reviews={reviews} />
          </MainContainer>
        </ReviewContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  h3 {
    margin-left: 10px;
    font-size: 14px;
    font-weight: normal;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export default RatingsReviews;
