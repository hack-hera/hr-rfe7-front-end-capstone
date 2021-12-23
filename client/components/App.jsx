import React, { Component } from 'react';
import { THEMES } from '../settings/colors';
import styled, { ThemeProvider } from 'styled-components';
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
      <ThemeProvider theme={THEMES.default}>
        <Header />
        <Container>
          <ProductDetail />
          <QuestionsAnswers />
          <RatingsReviews />
          <RelatedItems />
        </Container>
      </ThemeProvider >
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  min-height: calc(100% - 100px);
  padding: 20px;
  background-color: ${props => props.theme.bg};
  `;

export default App;