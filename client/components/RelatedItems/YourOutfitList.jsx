import React from 'react';
import CardItem from './CardItem.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfitArray: this.props.outfitData
    };
  }

  render() {
    return (
      <div className="your-outfit-list">
        {this.state.outfitArray.map(item => (
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