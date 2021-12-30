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

  var pictureSrc;

  if (props.item.styles[0].photos[0].thumbnail_url) {
    pictureSrc = props.item.styles[0].photos[0].thumbnail_url;
  } else {
    pictureSrc = 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg';
  }

  return (
    <Container>
      <PictureContainer>
        <Picture>
          <img src={pictureSrc} />
        </Picture>
        <Button>
          {button}
        </Button>
      </PictureContainer>

      <Category>{props.item.category}</Category>
      <Name>{props.item.name}</Name>
      <Price>{props.item.default_price}</Price>
      <Stars />
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

const PictureContainer = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

const Picture = styled.div`
  img {
    height: 150px;
    width: 150px;
  }
`;

const Button = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const AddCard = styled.div`
border: 1px solid ${(props) => props.theme.bgDark};
`;

export default CardItem;
