import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.jsx';

const UpdateCart = ({ style }) => {
  console.log(style);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  useEffect(() => {
    setSelectedSize(0);
    setSelectedQuantity(0);
  }, [style.style_id]);

  let sizes = Object.keys(style.skus).map((x) => style.skus[x].size);
  let quantities = Object.keys(style.skus).map((x) => style.skus[x].quantity);

  let availableQuantities = new Array(Math.min(15, quantities[selectedSize]))
    .fill(0)
    .map((x, i) => i + 1);

  return (
    <Container>
      <Selections>
        <SizeSelection
          onChange={(e) => {
            setSelectedSize(parseInt(e.target.value));
            setSelectedQuantity(0);
          }}
          value={selectedSize}
        >
          <option>Select Size</option>
          {sizes.map((size, i) => (
            <option key={i} value={i}>
              {size}
            </option>
          ))}
        </SizeSelection>
        <QuantitySelection
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
        >
          {availableQuantities.map((quantity, i) => (
            <option key={i} value={i}>
              {quantity}
            </option>
          ))}
        </QuantitySelection>
      </Selections>

      {/* <Warning id='warning'>Please Select Size</Warning>
      <Selections>
        <SizeSelection
          id='size'
          onChange={(event) => {
            warning.style.visibility = 'hidden';
            return props.changeSize(event.target.value);
          }}
        >
          {availability.map((option, i) => (
            <option key={i} value={option.size}>
              {option.size}
            </option>
          ))}
        </SizeSelection>
        <QuantitySelection onChange={(event) => props.changeQuantity(event.target.value)}>
          {amountAvailable.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </QuantitySelection>
      </Selections>
      <AddToCart
        availability={availability}
        addToCart={props.addToCart}
        selectedSize={props.selectedSize}
      /> */}
    </Container>
  );
};

export default UpdateCart;

const Selections = styled.div`
  display: flex;
`;

const Warning = styled.div`
  visibility: hidden;
  color: red;
`;

const Container = styled.div`
  width: 100%;
  justify-content: space-between;
`;

const SizeSelection = styled.select`
  width: 50%;
  margin-right: 5px;
`;

const QuantitySelection = styled.select`
  width: 50%;
  margin-right: 5px;
`;
