import React, { useState } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import ls from 'local-storage';
import RelatedCarousel from './RelatedCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';

var RelatedItems = (props) => {
  var outfit = ls.get('myoutfit') || [];
  const [outfitData, setOutfit] = useState(outfit);

  const add = () => {
    let product = props.product;
    product.rating = props.rating;
    let id = product.id;
    if (outfit.length === 0) {
      ls.set('myoutfit', [...outfit, product]);
    } else {
      let ids = outfit.reduce((items, current) => items.concat(current.id), []);
      if (ids.indexOf(id) === -1) {
        ls.set('myoutfit', [...outfit, product]);
      }
    }
    let update = ls.get('myoutfit') || [];
    setOutfit(update);
  };

  const remove = (removeId) => {
    ls.set('myoutfit', outfit.filter(item => item.id !== removeId));
    let update = ls.get('myoutfit') || [];
    setOutfit(update);
  };
  return (
    <Container>
      <Header>RelatedItems</Header>
      <RelatedCarousel
        relatedItems={props.related.related}
        currentProduct={props.product}
        relatedRating={props.related.ratings}
        update={props.updateProduct}
      />
      <Header>YourOutfit</Header>
      <OutfitCarousel
        outfitData={outfit}
        removeItem={remove}
        addOutfit={add}
        currentProduct={props.product}
      />
    </Container>
  );
};

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