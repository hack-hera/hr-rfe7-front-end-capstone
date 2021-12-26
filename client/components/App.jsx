import React, { Component } from 'react';

import { THEMES } from '../settings/colors';
import styled, { ThemeProvider } from 'styled-components';
import { ProductDetail } from './ProductDetail';
import { QuestionsAnswers } from './QuestionsAnswers';
import { RatingsReviews } from './RatingsReviews';
import { RelatedItems } from './RelatedItems';
import { Header } from './Header';
import api from '../api';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null
    };
  }

  componentDidMount() {
  }

  //Handler to update the main product
  updateProduct(id) {
    api.getProduct({ product_id: id }).then(res => {
      this.setState({ currentProduct: res });
    });
  }

  render() {
    const { currentProduct } = this.state;
    return (
      <ThemeProvider theme={THEMES.default}>
        <Header />
        <h3>HTML DEBUGGER</h3>
        <Debugger>{JSON.stringify(this.state.currentProduct)}</Debugger>
        <Container>
          <ProductDetail
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          <QuestionsAnswers
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          <RatingsReviews
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          <RelatedItems
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
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

const Debugger = styled.pre`
  width: 800px;
  background-color: black;
  color: green;
  white-space: pre-wrap;
`;

export default App;