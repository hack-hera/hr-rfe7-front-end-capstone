import React, { Component } from 'react';

import { THEMES } from '../settings/colors';
import styled, { ThemeProvider } from 'styled-components';
import { ProductDetail } from './ProductDetail';
import { QuestionsAnswers } from './QuestionsAnswers';
import { RatingsReviews } from './RatingsReviews';
import { RelatedItems } from './RelatedItems';
import { Header } from './Header/Header';
import { Loader } from './Shared/Loader';
import api from '../api';
import { useWorker } from 'react-hooks-worker';

const createWorker = () => new Worker(new URL('../webworker.js', import.meta.url));

const BackgroundCache = ({ current }) => {
  const { result, error } = useWorker(createWorker, current);
  return <></>;
};

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
      loading: false,
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
  async updateProduct(id) {
    let isCached = await api.isProductCached({ product_id: id });

    if (!isCached) {
      await this.setState({ loading: true });
    }

    let data = await api.getAllData({ product_id: id });

    this.setState({
      currentProduct: data.currentProduct,
      relatedProducts: data.relatedProducts,
      questionData: data.questionData,
      reviewData: data.reviewData,
      loading: false,
    });
  }

  render() {
    const { products, currentProduct, relatedProducts, reviewData, darkMode, loading } = this.state;
    return (
      <ThemeProvider theme={THEMES[darkMode ? 'darkMode' : 'default']}>
        <BackgroundCache current={{ current: currentProduct, related: relatedProducts }} />
        <Header
          toggleColors={() => this.setState({ darkMode: !darkMode })}
          products={products}
          product={currentProduct}
          updateProduct={(id) => this.updateProduct(id)}
        />
        {loading === true && (
          <Container>
            <Loader />
          </Container>
        )}
        {currentProduct && loading === false && (
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
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgLight};
`;

export default App;
