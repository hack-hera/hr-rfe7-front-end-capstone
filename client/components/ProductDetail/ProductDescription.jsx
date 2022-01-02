import React from 'react';
import styled from 'styled-components';

const ProductDescription = (props) => {
  if (props.currentProduct.features) {
    return (
      <Container>
        <Description>
          {props.currentProduct.description}
        </Description>
        <Features>
          {props.currentProduct.features.map((feature) => (
            <li>{feature.feature}: {feature.value}</li>
          ))}
        </Features>
      </Container>
    );
  } else {
    return (
      <Container>
        <Description>
          {props.currentProduct.description}
        </Description>
      </Container>
    );
  }
};

export default ProductDescription;

const Container = styled.div`
  display: flex;
`;

const Description = styled.div`
  width: 50%
`;

const Features = styled.ul`
  width: 50%
`;