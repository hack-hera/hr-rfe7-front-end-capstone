import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../Shared/Modal.jsx';
import ModalImage from './ModalImage.jsx';

const ProductImage = (props) => {
  const [showing, setShowing] = useState(false);

  if (props.currentPhoto.url) {
    return (
      <Container>
        <Image
          id = "image"
          src={props.currentPhoto.url}
          onClick={() => {
            setShowing(true);
          }}
        />
        {showing && (
          <Modal
            height={100}
            width={100}
            onClose={() => setShowing(false)}>
            <ModalImage currentPhoto={props.currentPhoto} currentStyle={props.currentStyle} changePhoto={props.changePhoto}/>
          </Modal>
        )}
      </Container>
    );
  } else {
    return (
      <Image
        id = "image"
        src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
      />
    );
  }
};

const Container = styled.div`

`;

const Image = styled.img`
  max-width: 400px;
  max-height: 440px;
  cursor: zoom-in;
`;



export default ProductImage;