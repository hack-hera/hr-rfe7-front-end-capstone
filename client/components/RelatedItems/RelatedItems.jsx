import React from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import RelatedItemsList from './RelatedItemsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import api from '../../api.js';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: null
      // currentProduct: props.product,
      // relatedItems: [], //make one get request for both ID and product info
      // outfitData: []
    };
  }


  getRelatedProducts(currentProduct) {
    api.getRelatedProducts(currentProduct);
  }

  render() {
    return (
      <Container>
        <Header>RelatedItems</Header>
        {/* <RelatedItemsList
          relatedItems={this.state.relatedItems}
        />
        <Header>YourOutfit</Header>
        <YourOutfitList
          outfitData={this.state.outfitData}
        /> */}
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