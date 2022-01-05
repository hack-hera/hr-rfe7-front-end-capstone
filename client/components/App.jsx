import React, { Component } from 'react';

import { THEMES } from '../settings/colors';
import styled, { ThemeProvider } from 'styled-components';
import { ProductDetail } from './ProductDetail';
import { QuestionsAnswers } from './QuestionsAnswers';
import { RatingsReviews } from './RatingsReviews';
import { RelatedItems } from './RelatedItems';
import { Header } from './Header/Header';
import api from '../api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentProduct: null,
      relatedProducts: null,
      questionData: null,
      reviewData: null,
      darkMode: false,
    };
  }

  addToCart(obj) {
    console.log('>>>adding to cart!', obj);
  }

  fetchReviewData({ product_id, page = 1, count = 100, sort = 'newest' }) {
    api.getReviewData({ product_id, page, count, sort }, false).then((res) => {
      this.setState({ reviewData: res });
    });
  }

  fetchQuestionData({ product_id, page = 1, count = 100 }) {
    api.getQuestionData({ product_id, page, count }, false).then((res) => {
      this.setState({ questionData: res });
    });
  }

  componentDidMount() {
    api.getProducts({ count: 100 }).then((products) => {
      this.setState({ products: products }, () => {
        this.updateProduct(products[0].id);
      });
    });
  }

  //Handler to update the main product
  updateProduct(id) {
    api.getAllData({ product_id: id }).then((data) => {
      this.setState({
        currentProduct: data.currentProduct,
        relatedProducts: data.relatedProducts,
        questionData: data.questionData,
        reviewData: data.reviewData,
      });
    });
  }

  render() {
    const { products, currentProduct, reviewData, darkMode } = this.state;
    return (
      <ThemeProvider theme={THEMES[darkMode ? 'darkMode' : 'default']}>
        <Header
          toggleColors={() => this.setState({ darkMode: !darkMode })}
          products={products}
          product={currentProduct}
          updateProduct={(id) => this.updateProduct(id)}
        />
        {currentProduct && (
          <Container>
            <ProductDetail
              product={currentProduct}
              updateProduct={(id) => this.updateProduct(id)}
              productReviews={reviewData}
              addToCart={(obj) => this.addToCart(obj)}
            />
            {this.state.relatedProducts && (
              <RelatedItems
                product={currentProduct}
                related={this.state.relatedProducts}
                updateProduct={(id) => this.updateProduct(id)}
                rating={this.state.reviewData}
              />
            )}
            <QuestionsAnswers
              data={this.state.questionData}
              product={currentProduct}
              updateProduct={(id) => this.updateProduct(id)}
              fetchQuestionData={(params) => this.fetchQuestionData(params)}
            />
            {reviewData && (
              <RatingsReviews
                data={reviewData}
                product={currentProduct}
                fetch={(params) => this.fetchReviewData(params)}
              />
            )}
          </Container>
        )}
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
