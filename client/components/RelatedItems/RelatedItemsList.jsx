import React from 'react';
import styled from 'styled-components';
import CardItem from './CardItem.jsx';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedItems: this.props.relatedItems
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const relatedItems = this.props.relatedItems;
    if (relatedItems.length > 0 && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      console.log(this.props.relatedItems);
      this.setState({
        relatedItems: this.props.relatedItems
      });
    }
  }

  render() {
    console.log(this.state.relatedItems);
    return (
      <Container>
        {this.state.relatedItems.map(item => (
          <CardItem
            key={item.id}
            item={item}
            inOutfit={false}
            add={this.props.addOutfit}
          />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
`;

export default RelatedItemsList;