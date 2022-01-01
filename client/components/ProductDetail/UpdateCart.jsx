import React from 'react';
import styled from 'styled-components';

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

  const addToCart = document.getElementById('add');

  if (availability.length === 1) {
    availability[0].size = 'Out of Stock';
    addToCart.style.visibility = 'hidden';
  }

  var array = ['-'];
  var count = 1;
  while (count <= props.selectedSize.quantity) {
    array.push(count);
    count++;
    if (count === 16) {
      break;
    }
  }

  if (array.length > 1) {
    array.shift();
  }

  const warning = document.getElementById('warning');
  const SizeMenu = document.getElementById('size');

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
          {array.map((option) => (
            <option key={option} value = {option}>{option}</option>
          ))}
        </QuantitySelection>
      </Selections>
      <AddToCart id="add" onClick = {() => {
        if (props.selectedSize === '') {
          warning.style.visibility = 'visible';
          SizeMenu.click();
        } else {
          props.addToCart();
        }
      }}>
        AddToCart
      </AddToCart>
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

const AddToCart = styled.button`
  margin: 15px 0px 15px 0px;
  width: 50%;
`;