import React from 'react';
import styled from 'styled-components';

const ImageOptions = (props) => {
  return (
    props.productStyles.photos.map((i, k) => (
      <Thumbnail
        key={k}
        src={i.thumbnail_url}
        onClick={() => {
          props.changePhoto(i);
        }}
      />
    ))
  );
};

export default ImageOptions;

const Thumbnail = styled.img`
  margin: 3px;
  border: 6px;

  border-color: blue;

  max-height: 55px;
  max-width: 33px;
  background-color: red;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;