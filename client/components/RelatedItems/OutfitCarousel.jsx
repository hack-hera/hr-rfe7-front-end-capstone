import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import CardItem from './CardItem.jsx';

var OutfitCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(props.outfitData.length);

  useEffect(() => {
    setLength(props.outfitData.length);
  }, [props.outfitData]);

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return (
    <CarouselComponent>
      <CarouselContainer>
        {
          currentIndex > 0 &&
          <LeftButton>
            <FontAwesomeIcon icon={faArrowCircleLeft} onClick={prev} />
          </LeftButton>
        }
        <CarouselWrapper>
          <CarouselContent
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            <CardItem
              firstCard={true}
              add={props.addOutfit}
            />
            {props.outfitData.map((item, i) => {
              return (
                <CardItem
                  key={i}
                  item={item}
                  inOutfit={true}
                  remove={props.removeItem}
                />
              );
            })}
          </CarouselContent>
        </CarouselWrapper>
        {
          currentIndex < (length - 1) &&
          <RightButton>
            <FontAwesomeIcon icon={faArrowCircleRight} onClick={next} />
          </RightButton>
        }
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
position: relative;
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
width: 100%;
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
background-image: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1));
`;

const RightButton = styled.div`
position: absolute;
z-index: 1;
top: 50%;
transform: translateY(-50%);
width: 100px;
height: 100%;
right: 0px;
background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
`;

export default OutfitCarousel;