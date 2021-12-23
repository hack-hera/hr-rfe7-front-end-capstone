import React, { Component } from 'react';
import { COLORS } from '../settings/colors';
import styled from 'styled-components';
import { ProductDetail } from './ProductDetail';
import { QuestionsAnswers } from './QuestionsAnswers';
import { RatingsReviews } from './RatingsReviews';
import { RelatedItems } from './RelatedItems';
import { Header } from './Header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <Container>
          <ProductDetail />
          <QuestionsAnswers />
          <RatingsReviews />
          <RelatedItems />
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  min-height: calc(100% - 100px);
  padding: 20px;
  background-color: ${COLORS.bg};
`;

export default App;