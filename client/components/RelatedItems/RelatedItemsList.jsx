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
    const { relatedItems } = this.props.relatedItems;
    if (relatedItems && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        relatedItems: this.props.relatedItems
      });
    }
  }

  render() {
    return (
      <Container>
        {this.state.relatedItems.map(item => (
          <CardItem
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