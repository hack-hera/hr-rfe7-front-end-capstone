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
    };
  }

  componentDidMount() {
    api.getProducts({ count: 20 }).then((res) => {
      this.setState({ currentProduct: res[0], products: res });
      this.updateProduct(res[0].id);
    });
  }

  //Handler to update the main product
  updateProduct(id) {
    api.getProduct({ product_id: id }).then((res) => {
      this.setState({ currentProduct: res });
    });
  }

  render() {
    const { products, currentProduct } = this.state;
    return (
      <ThemeProvider theme={THEMES.default}>
<<<<<<< HEAD
        <Header />
        <h3>HTML DEBUGGER</h3>
        {/* <Debugger>{JSON.stringify(this.state.currentProduct)}</Debugger> */}
=======
        <Header
          products={products}
          product={currentProduct}
          updateProduct={(id) => this.updateProduct(id)}
        />
>>>>>>> master
        <Container>
          <ProductDetail product={currentProduct} updateProduct={(id) => this.updateProduct(id)} />
          <RelatedItems product={currentProduct} updateProduct={(id) => this.updateProduct(id)} />
          <QuestionsAnswers
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
<<<<<<< HEAD
          <RatingsReviews
            product={currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
          <RelatedItems
            product={this.state.currentProduct}
            updateProduct={(id) => this.updateProduct(id)}
          />
=======
          <RatingsReviews product={currentProduct} updateProduct={(id) => this.updateProduct(id)} />
>>>>>>> master
        </Container>
      </ThemeProvider>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.bg};
`;

export default App;
