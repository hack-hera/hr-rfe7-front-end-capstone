import React from 'react';
import CardItem from './CardItem.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsData: props.data
    };
  }

  render() {
    return (
      <div className="related-items-list">
        <CardItem
          isRelatedItem={props.related}
        />
      </div>
    );
  }
}

export default RelatedItemsList;