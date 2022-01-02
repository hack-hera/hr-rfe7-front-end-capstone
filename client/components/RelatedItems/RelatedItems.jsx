import React, { Component } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import RelatedCarousel from './RelatedCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import api from '../../api.js';
import ls from 'local-storage';

class RelatedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: this.props.product,
      currentProductRating: this.props.rating,
      relatedItems: [],
      ratings: [],
      outfitData: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.getRelatedProducts({ product_id: id });
      this.getOutfit();
    }
    console.log('this is relatedItems', this.state.relatedItems);
    console.log('this is ratings', this.state.ratings);
    // console.log('this is currentProduct', this.props.product);
    // console.log('this is from app', this.props.state);
    console.log('this is outfitdata', this.state.outfitData);
  }

  getRelatedProducts(product) {
    api.getRelatedProductData(product)
      .then(results => {
        this.setState({
          relatedItems: results.related,
          ratings: results.ratings
        });
      })
      .catch(err => {
        new Error('error retrieving related products');
      });
  }


  getOutfit() {
    let outfit = ls.get('myoutfit') || [];
    this.setState({
      outfitData: outfit
    });
  }


  // after api.getRelatedProducts get and add pictures then get and add rating info
  addToOutfit() {
    let product = this.props.product;
    product.rating = this.props.rating;
    let id = product.id;
    let outfit = ls.get('myoutfit') || [];
    if (outfit.length === 0) {
      ls.set('myoutfit', [...outfit, product]);
    } else {
      let ids = outfit.reduce((items, current) => items.concat(current.id), []);
      if (ids.indexOf(id) === -1) {
        ls.set('myoutfit', [...outfit, product]);
      }
    }
    this.getOutfit();
  }

  removeFromOutfit(clickedProductId) {
    let outfit = ls.get('myoutfit') || [];
    let removeId = clickedProductId;
    ls.set('myoutfit', outfit.filter(item => item.id !== removeId));
    this.getOutfit();
  }

  render() {
    return (
      <Container>
        <Header>RelatedItems</Header>
        <RelatedCarousel
          relatedItems={this.state.relatedItems}
          relatedRatings={this.state.ratings}
          currentProduct={this.props.product}
          update={this.props.updateProduct}
        />
        <Header>YourOutfit</Header>
        <OutfitCarousel
          outfitData={this.state.outfitData}
          removeItem={this.removeFromOutfit.bind(this)}
          addOutfit={this.addToOutfit.bind(this)}
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