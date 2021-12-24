import React from 'react';
import CardItem from './CardItem.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: props.product
    };
  }

  render() {
    return (
      <div className="related-items-list">
        {this.state.currentItem}
      </div>
    );
  }
}

export default RelatedItemsList;