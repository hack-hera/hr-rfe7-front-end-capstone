import React from 'react';
import styled from 'styled-components';
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
      <Container>
        <CardItem firstCard={true} />
        {this.state.outfitArray.map(item => (
          <CardItem
            item={item}
            inOutfit={true}
            remove={this.props.removeItem}
          />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px 20px 20px;
`;

export default YourOutfitList;