import React from 'react';
import styled from 'styled-components';
import CardItem from './CardItem.jsx';

var OutfitCarousel = (props) => {
  return (
    <CarouselComponent>
      <CarouselContainer>
        <CarouselWrapper>
          <CarouselContent>
            <CardItem
              firstCard={true}
            />
            {props.outfitData.map((item, i) => {
              return (
                <CardItem
                  key={item.id}
                  item={item}
                  inOutfit={true}
                  remove={props.removeItem}
                />
              );
            })}
          </CarouselContent>
        </CarouselWrapper>
      </CarouselContainer>
    </CarouselComponent>
  );
};

const CarouselComponent = styled.div`
`;

const CarouselContainer = styled.div`
`;

const CarouselWrapper = styled.div`
`;

const CarouselContent = styled.div`
`;

export default OutfitCarousel;