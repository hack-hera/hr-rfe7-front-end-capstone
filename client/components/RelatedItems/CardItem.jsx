import React from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import { Stars } from '../Shared/Stars.jsx';
import XButton from './XButton.jsx';
import StarButton from './StarButton.jsx';

var CardItem = (props) => {
  let button;
  if (!props.inOutfit) {
    button = <StarButton onClick={props.add} />;
  } else {
    button = <XButton onClick={props.remove} />;
  }

  if (props.firstCard) {
    return (
      <Container>
        <AddCard>Add to Your Outfit</AddCard>
      </Container>
    );
  }

  return (
    <Container>
      <Picture>picture</Picture>
      <Category>{props.item.category}</Category>
      <Name>{props.item.name}</Name>
      <Price>{props.item.default_price}</Price>
      <Stars />
      <Button>
        {button}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px 0px 20px 0px;
  padding: 0px 10px 10px 10px;
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const Category = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const Name = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const Price = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const Picture = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const Button = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const AddCard = styled.div`
border: 1px solid ${(props) => props.theme.bgDark};
`;

export default CardItem;
