import React from 'react';
import CardItem from './CardItem.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfitArray: props.outfitData
    };
  }

  render() {
    return (
      <div className="your-outfit-list">
        {props.relatedItems.map(item => (
          <CardItem
            item={item}
            inOutfit={true}
            remove={props.removeItem}
          />
        ))}
      </div>
    );
  }
}

export default YourOutfitList;