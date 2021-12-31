import React, { Component } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import RelatedCarousel from './RelatedCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import api from '../../api.js';

class RelatedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: this.props.product,
      relatedItems: [],
      pictures: [],
      outfitData: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.getRelatedProducts({ product_id: id });
    }
    console.log('this is relatedItems', this.state.relatedItems);
    console.log('this is currentProduct', this.props.product);
  }

  getRelatedProducts(product) {
    api.getRelatedProductData(product)
      .then(results => {
        this.setState({
          relatedItems: results.related
        });
      })
      .catch(err => {
        new Error('error retrieving related products');
      });
  }


  // after api.getRelatedProducts get and add pictures then get and add rating info
  addToOutfit() {
    this.state.outfitData.push(this.state.currentProduct);
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
        <RelatedCarousel
          relatedItems={this.state.relatedItems}
          addOutfit={this.addToOutfit.bind(this)}
          currentProduct={this.state.currentProduct}
        />
        <Header>YourOutfit</Header>
        <OutfitCarousel
          outfitData={this.state.outfitData}
          removeItem={this.removeFromOutfit.bind(this)}
          currentProduct={this.state.currentProduct}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default RelatedItems;