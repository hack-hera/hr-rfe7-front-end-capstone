import React, { Component } from 'react';

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
      <div>
        <Header />
        <ProductDetail />
        <QuestionsAnswers />
        <RatingsReviews />
        <RelatedItems />
      </div>
    );
  }
}

export default App;