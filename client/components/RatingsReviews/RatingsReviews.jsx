import React, { Component } from 'react';
import styled from 'styled-components';
import Ratings from './Ratings';
import Characteristics from './Characteristics';
import ReviewList from './ReviewList';
import api from '../../api';

class RatingsReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewMeta: null,
      reviews: null,
      showing: 2,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getReviews({ product_id: id, count: 100 }).then((res) => {
        this.setState({ reviews: res.results });
      });
      api.getReviewMeta({ product_id: id }).then((res) => {
        this.setState({ reviewMeta: res });
      });
    }
  }

  render() {
    const { reviewMeta, reviews, showing } = this.state;

    return (
      <Container>
        <h3>Ratings and Reviews</h3>
        <ReviewContainer>
          <LeftContainer>
            <Ratings meta={reviewMeta} />
            <Characteristics meta={reviewMeta} />
          </LeftContainer>
          <MainContainer>
            {reviews && <Header>{reviews.length} sorted by 'newest'</Header>}
            {reviews && (
              <ReviewList
                reviews={reviews.slice(0, showing)}
                showMore={() => this.setState({ showing: showing + 2 })}
              />
            )}
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

const Header = styled.div`
  padding: 0px 20px 20px 10px;
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
