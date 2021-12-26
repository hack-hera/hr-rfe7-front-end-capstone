import React from 'react';
import CardItem from './CardItem.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedItems: this.props.relatedItems
    };
  }

  render() {
    return (
      <div className="related-items-list">
        {this.state.relatedItems.map(item => (
          <CardItem
            item={item}
            inOutfit={false}
            add={this.props.addOutfit}
          />
        ))}
      </div>
    );
  }
}

export default RelatedItemsList;