import React from 'react';
import styled from 'styled-components';

const ProductDescription = (props) => {
  if (props.currentProduct.features) {
    return (
      <Container>
        <Description>
          <br></br>
          <b>Description</b>
          <br></br>
          {props.currentProduct.description}
        </Description>
        <Features>
          <b>Features</b>
          {props.currentProduct.features.map((feature, key) => (
            <li key={key}>{feature.feature}: {feature.value}</li>
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
  width: 55%
`;

const Features = styled.ul`
  width: 45%
`;