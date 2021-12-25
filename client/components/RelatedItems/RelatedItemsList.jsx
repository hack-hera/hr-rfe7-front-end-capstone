import React from 'react';
import CardItem from './CardItem.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedItems: props.relatedItems
    };
  }

  render() {
    return (
      <div className="related-items-list">
        {props.relatedItems.map(item => (
          <CardItem
            item={item}
            inOutfit={false}
            add={props.addOutfit}
          />
        ))}
      </div>
    );
  }
}

export default RelatedItemsList;