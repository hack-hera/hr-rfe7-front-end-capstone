import React from 'react';
import Stars from '../Shared/Stars.jsx';
import StarButton from './StarButton.jsx';
import XButton from './XButton.jsx';

var CardItem = (props) => {
  let button;
  if (!props.inOutfit) {
    button = <StarButton onClick={props.add} />;
  } else {
    button = <XButton onClick={props.remove} />;
  }

  return (
    <div className="card-item">
      <div className="product-category">{props.item.category}</div>
      <div className="product-name">{props.item.name}</div>
      <div className="product-price">{props.item.default_price}</div>
      <div className="product-picture">picture</div>
      <Stars />
      {button}
    </div>
  );
};

export default CardItem;