import React, { Component } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import RelatedItemsList from './RelatedItemsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import api from '../../api.js';

class RelatedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: props.product,
      relatedItems: [], //make one get request for both ID and product info
      outfitData: []
    };
  }


  getRelatedProducts(currentProduct) {
    api.getRelatedProducts(currentProduct);
    // return array of related item ids
    // for each put into array of promises
    // promise.all
    // set this.relatedItems equal to promised Array
  }

  addToOutfit(clickedProduct) {
    // figure out where to save current outfit list even on refreshes
    this.state.outfitData.push(clickedProduct);
  }

  render() {
    return (
      <Container>
        <Header>RelatedItems</Header>
        <RelatedItemsList
          relatedItems={this.state.relatedItems}
        />
        <Header>YourOutfit</Header>
        <YourOutfitList
          outfitData={this.state.outfitData}
          addOutfit={this.addToOutfit.bind(this)}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  color: ${COLORS.hover};
`;

const Header = styled.h1`
  color: ${COLORS.bg};
`;

export default RelatedItems;