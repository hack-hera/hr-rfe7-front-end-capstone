import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardItem from "./CardItem.jsx";

var OutfitCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(props.outfitData.length);

  useEffect(() => {
    setLength(props.outfitData.length);
  }, [props.outfitData]);

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

  return (
    <CarouselComponent>
      <CarouselContainer>
        {currentIndex > 0 && <LeftButton>&#171;</LeftButton>}
        <CarouselWrapper>
          <CarouselContent
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            <CardItem firstCard={true} add={props.addOutfit} />
            {props.outfitData.map((item, i) => {
              return (
                <CardItem
                  key={i}
                  item={item}
                  inOutfit={true}
                  rating={item.rating.ratings}
                  remove={props.removeItem}
                />
              );
            })}
          </CarouselContent>
        </CarouselWrapper>
        {currentIndex < length - 1 && <RightButton>&#187;</RightButton>}
      </CarouselContainer>
    </CarouselComponent>
  );
};

const CarouselComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  color: ${(props) => props.theme.textLight};
`;

const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  position: relative;
  padding: 5px;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 65%;
  height: 100%;
  padding: 5px;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: all 400ms linear;
  width: 100%;
  padding: 5px;
`;

const LeftButton = styled.div`
  cursor: pointer;
  position: absolute;
  font-size: 25px;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 100%;
  left: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to left,
    rgba(247, 247, 247, 0),
    rgba(247, 247, 247, 1)
  );
`;
// background-image: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));

const RightButton = styled.div`
  cursor: pointer;
  position: absolute;
  font-size: 25px;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 100%;
  right: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right,
    rgba(247, 247, 247, 0),
    rgba(247, 247, 247, 1)
  );
`;
// background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));

export default OutfitCarousel;
