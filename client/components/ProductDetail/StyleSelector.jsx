import React from 'react';
import styled from 'styled-components';

const StyleSelector = (props) => {
  return (
    <Container>
      {props.productStyles.map((i, k) => (
        <Thumbnail
          key={k}
          src={i.photos[0].thumbnail_url}
          onClick={() => {
            props.changeStyle(i);
          }}
        />
      ))}
    </Container>
  );
};

export default StyleSelector;

{
  /* <a href="http://clipart-library.com/clip-art/check-mark-with-transparent-background-13.htm"><img src="http://clipart-library.com/images_k/check-mark-with-transparent-background/check-mark-with-transparent-background-13.png" width="192" height="120" /></a> */
}

const Checkmark = styled.img`
  max-height: 10px;
  max-width: 10px;
`;

const Thumbnail = styled.img`
  margin: 10px;
  max-height: 55px;
  max-width: 33px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 33px;
  height: 150px;
`;
