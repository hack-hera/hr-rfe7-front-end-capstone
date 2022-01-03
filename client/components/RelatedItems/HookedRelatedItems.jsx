import React from 'react';
import RelatedCarousel from './RelatedCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';

var HookedRelatedItems = (props) => {
  const [currentProduct, setRelatedItems] = useState(props);

  return (
    <Container>
      <Header>RelatedItems</Header>
      <RelatedCarousel></RelatedCarousel>
      <Header>YourOutfit</Header>
      <OutfitCarousel></OutfitCarousel>
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

export default HookedRelatedItems;