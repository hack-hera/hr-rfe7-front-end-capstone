import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const StyleSelector = (props) => {
  const [styleIndex, setStyleIndex] = useState(0);
  const [length, setLength] = useState(props.productStyles.length);

  useEffect(() => {
    setLength(props.productStyles.length);
  }, [props.productStyles]);

  const next = () => {
    if (styleIndex < length - 1) {
      setStyleIndex((prevState) => prevState + 1);
    }
  };

  const previous = () => {
    if (styleIndex > 0) {
      setStyleIndex((prevState) => prevState - 1);
    }
  };

  return (
    <Container>
      <CarouselContainer>
        {styleIndex > 0 ? (
          <LeftButton>
            <FontAwesomeIcon icon={faArrowCircleLeft} onClick={previous} />
          </LeftButton>
        ) : (
          <HiddenButton>
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </HiddenButton>
        )}
        <CarouselWrapper>
          <CarouselContent style={{ transform: `translateX(-${(styleIndex * 100) / 4}%)` }}>
            {props.productStyles.map((style, key) => (
              <Thumbnail
                key={key}
                src={
                  style.photos[0].thumbnail_url ||
                  'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                }
                onClick={() => {
                  props.changeStyle(style);
                }}
              />
            ))}
          </CarouselContent>
        </CarouselWrapper>
        <RightButton>
          <FontAwesomeIcon icon={faArrowCircleRight} onClick={next} />
        </RightButton>
      </CarouselContainer>
    </Container>
  );
};

export default StyleSelector;

{
  /* <a href="http://clipart-library.com/clip-art/check-mark-with-transparent-background-13.htm"><img src="http://clipart-library.com/images_k/check-mark-with-transparent-background/check-mark-with-transparent-background-13.png" width="192" height="120" /></a> */
}

const Container = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 200%;
  height: 100%;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 100%;
  padding: 5px;
`;

const Checkmark = styled.img`
  max-height: 10px;
  max-width: 10px;
`;

const LeftButton = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  width: 12px;
  height: 12px;
  left: 0px;
  transform: translateY(35px);
`;

const HiddenButton = styled.div`
  visibility: hidden;
  display: flex;
  flex-direction: row;
  width: 12px;
  height: 12px;
  left: 0px;
`;

const RightButton = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  width: 12px;
  height: 12px;
  transform: translateY(35px);
`;

const Thumbnail = styled.img`
  margin-right: 10px;
  height: 4vw;
  width: 4vw;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  border-radius: 2vw;
`;
