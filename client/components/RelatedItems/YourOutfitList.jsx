import React from 'react';
import CardItem from './CardItem.jsx';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = [];
  }

  render() {
    return (
      <div className="your-outfit-list">
        <CardItem />
      </div>
    );
  }
}

export default YourOutfitList;