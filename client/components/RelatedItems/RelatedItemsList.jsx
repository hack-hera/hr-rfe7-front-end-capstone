import React from 'react';
import CardItem from './CardItem.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = [];
  }

  render() {
    return (
      <div className="related-items-list">
        <CardItem />
      </div>
    );
  }
}

export default RelatedItemsList;