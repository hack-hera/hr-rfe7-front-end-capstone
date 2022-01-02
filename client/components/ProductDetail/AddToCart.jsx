import React from 'react';
import styled from 'styled-components';

const AddToCart = (props) => {
  if (props.availability.length > 1) {
    return (
      <Button id="add" onClick = {() => {
        if (props.selectedSize === '') {
          const warning = document.getElementById('warning');
          warning.style.visibility = 'visible';
        } else {
          props.addToCart();
        }
      }}>
        Add To Cart
      </Button>
    );
  } else {
    return (
      <Button style={{visibility: 'hidden'}}>
        Out of Stock
      </Button>
    );
  }
};

export default AddToCart;

const Button = styled.button`
  margin: 15px 0px 15px 0px;
  width: 50%;
`;