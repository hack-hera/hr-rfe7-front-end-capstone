import React, { Component } from 'react';

import { THEMES } from '../settings/colors';
import styled, { ThemeProvider } from 'styled-components';
import { ProductDetail } from './ProductDetail';
import { QuestionsAnswers } from './QuestionsAnswers';
import { RatingsReviews } from './RatingsReviews';
import { RelatedItems } from './RelatedItems';
import { Header } from './Header/Header';
import { Loader } from './Shared/Loader';
import axios from 'axios';

const backgroundCacher = new Worker(new URL('../worker.js', import.meta.url));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentProduct: null,
      relatedProducts: null,
      reviewData: null,
      questionData: null,
      darkMode: false,
      cart: [],
    };
  }

  addToCart(obj) {
    console.log('>>>>adding to cart', obj);
    if (!this.state.cart.map((x) => x.style_id).includes(obj.style_id)) {
      this.setState({ cart: [...this.state.cart, obj] });
    }
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

  async fetchProductData() {
    let res = await axios.get('/products');
    this.setState({ products: res.data });
    this.updateProduct(res.data[0].id);
  }

  componentDidMount() {
    backgroundCacher.addEventListener('message', function (e) {
      console.log('Message from Worker: ' + e.data);
    });

    this.fetchProductData();
  }

  //Handler to update the main product
  async updateProduct(id) {
    console.log('fetching new product', id);
    // backgroundCacher.postMessage('HI');
    let res = await axios.get('/products/' + id);
    res.data.id = res.data.product_id;
    this.setState({ currentProduct: res.data });

    res = await axios.get('reviews/' + id);
    this.setState({ reviewData: res.data });

    res = await axios.get('related/' + id);
    this.setState({ relatedProducts: res.data });

    res = await axios.get('questions/' + id);
    this.setState({ questionData: res.data });
  }

  render() {
    const {
      products,
      currentProduct,
      relatedProducts,
      reviewData,
      questionData,
      darkMode,
      loading,
      cart,
    } = this.state;
    return (
      <ThemeProvider theme={THEMES[darkMode ? 'darkMode' : 'default']}>
        <Header
          toggleColors={() => this.setState({ darkMode: !darkMode })}
          products={products}
          product={currentProduct}
          updateProduct={(id) => this.updateProduct(id)}
          cart={cart}
          removeItemFromCart={(id) =>
            this.setState({ cart: this.state.cart.filter((x) => x.style_id !== id) })
          }
        />
        <Container>
          {currentProduct && (
            <ProductDetail
              product={currentProduct}
              productReviews={reviewData || {}}
              updateProduct={(id) => this.updateProduct(id)}
              addToCart={(obj) => this.addToCart(obj)}
            />
          )}
          {relatedProducts && reviewData && currentProduct && (
            <RelatedItems
              product={currentProduct}
              related={relatedProducts}
              updateProduct={(id) => this.updateProduct(id)}
              rating={reviewData}
            />
          )}
          {questionData && (
            <QuestionsAnswers
              data={questionData}
              product={currentProduct}
              updateProduct={(id) => this.updateProduct(id)}
              fetchQuestionData={(params) => this.fetchQuestionData(params)}
            />
          )}
          {reviewData && (
            <RatingsReviews
              data={reviewData}
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
  min-height: 100%;
  background-color: ${(props) => props.theme.bgLight};

  padding-left: 15%;
  padding-right: 15%;

  width: 70%;

  @media (max-width: 880px) {
    padding: 0px 30px 80px 30px;
    width: calc(100% - 60px);
  }
`;

export default App;
