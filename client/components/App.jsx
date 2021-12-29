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
      products: [],
      currentProduct: null,
      reviewData: null,
    };
  }

  fetchReviewData({ product_id, page = 1, count = 100, sort = 'newest' }) {
    api.getReviewData({ product_id, page, count, sort }).then((res) => {
      this.setState({ reviewData: res });
    });
  }

  componentDidMount() {
    api.getProducts({ count: 20 }).then((products) => {
      api
        .getProductData({ product_id: products[8].id })
        .then((currentProduct) => {
          this.setState({ products, currentProduct });
        });
    });
  }

  //Handler to update the main product
  updateProduct(id) {
    api.getProductData({ product_id: id }).then((currentProduct) => {
      this.setState({ currentProduct });
    });
  }

  render() {
    console.log(
      'Rendering App State:\n',
      this.state.products,
      this.state.currentProduct
    );
    const { products, currentProduct } = this.state;
    return (
      <ThemeProvider theme={THEMES.default}>
        <Header
          products={products}
          product={currentProduct}
          updateProduct={(id) => this.updateProduct(id)}
        />
        <Container>
          <ProductDetail
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          <RelatedItems
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          <QuestionsAnswers
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          {this.state.reviewData && (
            <RatingsReviews
              data={this.state.reviewData}
              product={currentProduct}
              fetch={(params) => this.fetchReviewData(params)}
            />
          )}
        </Container>
      </ThemeProvider>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.bgLight};
`;

export default App;
