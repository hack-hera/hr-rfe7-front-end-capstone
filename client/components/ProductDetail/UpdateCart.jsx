import React from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.jsx';

const UpdateCart = (props) => {
  var availability = [{
    size: 'Select Size',
    quantity: null
  }];

  for (var key in props.currentStyle.skus) {
    if (!props.currentStyle.skus[key].quantity) {
      continue;
    }
    var obj = {
      size: props.currentStyle.skus[key].size,
      quantity: props.currentStyle.skus[key].quantity
    };
    availability.push(obj);
  }

  if (availability.length === 1) {
    availability[0].size = 'Out of Stock';
  }

  var amountAvailable = ['-'];
  var count = 1;
  while (count <= props.selectedSize.quantity) {
    amountAvailable.push(count);
    count++;
    if (count === 16) {
      break;
    }
  }

  if (amountAvailable.length > 1) {
    amountAvailable.shift();
  }

  return (
    <Container>
      <Warning id="warning">Please Select Size</Warning>
      <Selections>
        <SizeSelection id="size" onChange = {(event) => {
          warning.style.visibility = 'hidden';
          return props.changeSize(event.target.value);
        }}>
          {availability.map((option, i) => (
            <option key={i} value = {option.size}>{option.size}</option>
          ))}
        </SizeSelection>
        <QuantitySelection onChange = {(event) => (props.changeQuantity(event.target.value))}>
          {amountAvailable.map((option) => (
            <option key={option} value = {option}>{option}</option>
          ))}
        </QuantitySelection>
      </Selections>
      <AddToCart
        availability={availability}
        addToCart={props.addToCart}
        selectedSize={props.selectedSize}/>
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