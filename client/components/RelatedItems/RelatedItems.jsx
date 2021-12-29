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
      currentProduct: this.props.product,
      relatedItems: [],
      outfitData: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.getRelatedProducts({ product_id: id });
    }
    console.log(this.state.relatedItems);
  }

  getRelatedProducts(product) {
    api.getRelatedProducts(product)
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


const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  h1 {
    margin: 0px;
    padding: 0px;
    color: ${(props) => props.theme.textDark};
  }
  div {
    margin: 4px 0px 0px 4px;
    font-size: 11px;
    color: ${(props) => props.theme.graph};
    padding: 0px;
  }
`;

const Container = styled.div`
  color: ${COLORS.hover};
`;

export default RelatedItems;