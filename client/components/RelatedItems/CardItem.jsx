import React from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import Stars from '../Shared/Stars.jsx';
import StarButton from './StarButton.jsx';
import XButton from './XButton.jsx';

var CardItem = (props) => {
  let button;
  if (!props.inOutfit) {
    button = <StarButton onClick={props.add} />;
  } else {
    button = <XButton onClick={props.remove} />;
  }

  return (
    <Container>
      <div>{props.item.category}</div>
      <div>{props.item.name}</div>
      <div>{props.item.default_price}</div>
      <div>picture</div>
      {/* <Stars /> */}
      {button}
    </Container>
  );
};

const Container = styled.div`
  color: ${COLORS.hover};
`;

export default CardItem;
