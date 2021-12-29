import React from 'react';
import styled from 'styled-components';

const StyleSelector = (props) => {
  return (
    <Container>
      {props.productStyles.results.map((i, k) => (
        <Thumbnail
          key={k}
          src={i.photos[0].thumbnail_url}
          onClick={() => alert('show a modal! ' + i.url)}
        />
      ))}
    </Container>
  );
};


export default StyleSelector;



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