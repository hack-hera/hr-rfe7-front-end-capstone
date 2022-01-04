import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import CardItem from './CardItem.jsx';

const RelatedCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(props.relatedItems.length);

  useEffect(() => {
    setLength(props.relatedItems.length);
  }, [props.relatedItems]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const ratings = props.relatedRating.map((rating, index) => {
    return rating.ratings;
  });
  console.log('this is ratings', ratings);

  return (
    <CarouselComponent>
      <CarouselContainer>
        {currentIndex > 0 && (
          <LeftButton>
            <FontAwesomeIcon icon={faArrowCircleLeft} onClick={prev} />
          </LeftButton>
        )}
        <CarouselWrapper>
          <CarouselContent style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
            {props.relatedItems.map((item, i) => {
              return (
                <CardItem
                  key={i}
                  item={item}
                  rating={ratings[i]}
                  inOutfit={false}
                  add={props.addOutfit}
                  currentProduct={props.currentProduct}
                  updateCurrent={props.update}
                />
              );
            })}
          </CarouselContent>
        </CarouselWrapper>
        {currentIndex < length - 1 && (
          <RightButton>
            <FontAwesomeIcon icon={faArrowCircleRight} onClick={next} />
          </RightButton>
        )}
      </CarouselContainer>
    </CarouselComponent>
  );
};

const CarouselComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: calc(100% / 2);
  padding: 5px;
`;

const LeftButton = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100%;
  left: 0px;
  background-image: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
`;

const RightButton = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100%;
  right: 0px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
`;

export default RelatedCarousel;
