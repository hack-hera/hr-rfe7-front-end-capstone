import React from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import RelatedItemsList from './RelatedItemsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedItems: [], //make one get request for both ID and product info
      outfitData: []
    };
  }

  render() {
    return (
      <div className="related-items">
        <Header>RelatedItems</Header>
        <RelatedItemsList />
        <Header>YourOutfit</Header>
        <YourOutfitList />
      </div>
    );
  }
}

const Header = styled.h1`
  color: ${COLORS.bg};
`;

export default RelatedItems;