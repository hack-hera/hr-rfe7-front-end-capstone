import React from 'react';
import ActionButton from './ActionButton.jsx';

var CardItem = (props) => {
  return (
    <div className="card-item">
      <div className="product-category">{props.item.category}</div>
      <div className="product-name">{props.item.name}</div>
      <div className="product-price">{props.item.default_price}</div>
      <div className="product-picture">picture</div>
      {/* insert star rating component */}
      <ActionButton
        handleAdd={props.add}
        id={props.item.id}
        type={props.inOutfit}
      />
    </div>
  );
};

export default CardItem;