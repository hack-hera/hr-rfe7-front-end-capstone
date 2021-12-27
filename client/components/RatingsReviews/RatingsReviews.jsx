import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { getRatingFilters, allTrue } from '../../lib/ratingFunctions';

import Ratings from './Ratings';
import Characteristics from './Characteristics';
import ReviewList from './ReviewList';
import AddReview from './AddReview';

class RatingsReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewMeta: null,
      reviews: null,
      reviewsShowing: 2,
      modalShowing: false,
      filters: { ...allTrue }
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

  //only show star ratings with X stars
  updateFilter(stars) {
    let temp = getRatingFilters(this.state.filters, stars);
    this.setState({ filters: temp }, () => console.log(Object.values(this.state.filters)));
  }

  render() {
    const { reviewMeta, reviews, reviewsShowing, modalShowing, filters } = this.state;

    return (
      <Container>
        {modalShowing === true && <AddReview onClose={() => this.setState({ modalShowing: false })} />}
        <h3>Ratings and Reviews</h3>
        <MainContainer>
          <LeftContainer>
            {reviewMeta && (
              <Ratings
                meta={reviewMeta}
                updateFilter={(s) => this.updateFilter(s)}
                filters={filters}
              />
            )}
            {reviewMeta && <Characteristics meta={reviewMeta} />}
          </LeftContainer>
          <RightContainer>
            {reviews && (
              <ReviewList
                reviews={reviews}
                reviewsShowing={reviewsShowing}
                filters={filters}
                showMore={() => this.setState({ reviewsShowing: reviewsShowing + 2 })}
                addReview={() => this.setState({ modalShowing: true })}
              />
            )}
          </RightContainer>
        </MainContainer>
      </Container >
    );
  }
}

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
