import React, { Component } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import { Header } from '../Header.jsx';
import RelatedItemsList from './RelatedItemsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import api from '../../api.js';

class RelatedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: this.props.product,
      relatedItems: [],
      outfitData: []
    };
  }

  componentDidMount() {
    this.getRelatedProducts(this.state.currentProduct);
  }

  getRelatedProducts(currentProduct) {
    api.getRelatedProducts(currentProduct)
      .then(results => {
        this.setState({
          relatedItems: results
        });
      })
      .catch(err => {
        new Error('error retrieving related products');
      });
    // return array of related item ids
    // for each put into array of promises
    // promise.all
    // set this.relatedItems equal to promised Array
  }

  addToOutfit(clickedProductId) {
    // figure out where to save current outfit list even on refreshes
    // make get request with that product ID
    // push result into outfit array
  }

  removeFromOutfit(clickedProductId) {
    // i = index of clickedProductId
    // array.splice(i, 1)
    // and update in unchanged data
  }

  render() {
    return (
      <Container>
        <Header>RelatedItems</Header>
        <RelatedItemsList
          relatedItems={this.state.relatedItems}
          addOutfit={this.addToOutfit.bind(this)}
        />
        <Header>YourOutfit</Header>
        <YourOutfitList
          outfitData={this.state.outfitData}
          removeItem={this.removeFromOutfit.bind(this)}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  color: ${COLORS.hover};
`;

export default RelatedItems;