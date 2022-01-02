import React, { useState } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import { Stars } from '../Shared/Stars.jsx';
import XButton from './XButton.jsx';
import StarButton from './StarButton.jsx';
import CompareModal from './CompareModal.jsx';
import { Modal } from '../Shared/Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

var CardItem = (props) => {
  const [showing, setShowing] = useState(false);

  const compare = () => {
    setShowing(true);
  };

  const updateCurrentProduct = () => {
    props.updateCurrent(props.item.id);
  };

  const remove = () => {
    props.remove(props.item.id);
  };


  let button;
  if (!props.inOutfit) {
    button = <Button>
      <StarButton onClick={compare} />
    </Button>;
  } else {
    button = <Button>
      <XButton onClick={remove} />
    </Button>;
  }

  if (props.firstCard) {
    return (
      <Container>
        <AddCard>
          <AddTitle>
            Add item to your outfit
          </AddTitle>
          <AddButton>
            <FontAwesomeIcon icon={faPlusCircle} onClick={props.add} />
          </AddButton>
        </AddCard>
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

      {showing === true && (
        <Modal
          onClose={() => setShowing(false)}>
          <CompareModal
            related={props.item}
            current={props.currentProduct}
          />
        </Modal>
      )}

      <PictureContainer>
        <Picture onClick={updateCurrentProduct}>
          <img src={pictureSrc} />
        </Picture>
        {button}
      </PictureContainer>

      <Category>{props.item.category}</Category>
      <Name onClick={updateCurrentProduct}>
        {props.item.name}
      </Name>
      <Price>${props.item.default_price}</Price>
      <Stars />
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 10px 10px 10px;
  margin: 10px 0px;
  width: 180px;
  height: 250px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.bgDark};
`;

const Category = styled.div`
  grid-column
  font-size: 12px;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 12px;
`;

const PictureContainer = styled.div`
  border: 1px solid ${(props) => props.theme.bgDark};
  display: flex;
  flex-direction: row;
`;

const Picture = styled.div`
  img {
    height: 150px;
    width: 150px;
  }
`;

const Button = styled.div`
z-index: 1;
`;

const AddCard = styled.div`
height: 150px;
width: 150px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const AddTitle = styled.div`
font-size: 14px;
font-weight: bold;
text-align: center;
`;

const AddButton = styled.div`
font-size: 100px;
`;

export default CardItem;
