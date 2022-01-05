import React from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';

const ModalImage = (props) => {
  return (
    <Container>
      <ImageGalleryContainer>
        <ImageGallery currentStyle={props.currentStyle} changePhoto={props.changePhoto} />
      </ImageGalleryContainer>
      <img src={props.currentPhoto.url}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  max-height: 100vh;
  img {
    max-width: 88vw;
    max-height: 88vh;
  }
  cursor: crosshair;
`;

const ImageGalleryContainer = styled.div`
  display: inline-block;
  width: 33px;
  height: 440px;
  margin-right: 30px;
`;

export default ModalImage;