import React from 'react';
import styled from 'styled-components';

const RenderPrice = (props) => {
  if (props.currentStyle.sale_price) {
    return (
      <Container>
        <SalePrice>
          Price ${props.currentStyle.sale_price}
        </SalePrice>
        <OriginalPrice>
          ${props.currentStyle.original_price}
        </OriginalPrice>
      </Container>
    );
  } else {
    return (
      <Price>
        <b>Price:</b> ${props.currentStyle.original_price}
      </Price>
    );
  }
};

export default RenderPrice;

const Container = styled.div`
  display: flex;
`;

const SalePrice = styled.b`
  margin-right: 10px;
`;

const Price = styled.div`

`;

const OriginalPrice = styled.div`
  color: red;
  text-decoration: line-through;
`;