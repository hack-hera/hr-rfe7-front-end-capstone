import React from 'react';
import styled from 'styled-components';

var CompareModal = (props) => {
  const relatedFeatArr = props.related.features.reduce((result, current) => result.concat(current.feature), []);
  const currentFeatArr = props.current.features.reduce((result, current) => result.concat(current.feature), []);


  var allFeats = relatedFeatArr.concat(currentFeatArr);
  var unique = [];
  for (let i = 0; i < allFeats.length; i++) {
    if (!unique.includes(allFeats[i])) {
      unique.push(allFeats[i]);
    }
  }

  let hasFeature = false;
  for (var i = 0; i < relatedFeatArr.length; i++) {
    if (currentFeatArr.includes(relatedFeatArr[i])) {
      hasFeature = true;
      break;
    }
  }

  const characteristics = unique.map((char, index) => {
    var related;
    var current;
    if (relatedFeatArr.includes(char)) {
      var relatedIndex = relatedFeatArr.indexOf(char);
      related = props.related.features[relatedIndex].value;
    } else {
      related = 'none';
    }

    if (currentFeatArr.includes(char)) {
      var currentIndex = currentFeatArr.indexOf(char);
      current = props.current.features[currentIndex].value;
    } else {
      current = 'none';
    }
    if (hasFeature) {
      return (
        <Row key={index}>
          <Column >
            {current}
          </Column>
          <Column >
            {char}
          </Column>
          <Column >
            {related}
          </Column>
        </Row>
      );
    } else {
      return (
        <Row key={index}>
          <Column >
          </Column>
          <Column >
            {char}
          </Column>
          <Column >
          </Column>
        </Row >
      );
    }
  });

  return (
    <Container>
      <Title>Comparing</Title>
      <Table>
        <Header>
          <Current>
            {props.current.name}
          </Current>
          <Empty />
          <Related>
            {props.related.name}
          </Related>
        </Header>
        <RowsContainer>
          {characteristics}
        </RowsContainer>
      </Table>
    </Container >
  );
};

const Container = styled.div`

`;

const Table = styled.div`
  display: flex;
  flex-flow: column nowrap;
  font-size: .8rem;
  margin: 0.5rem;
  line-height: 1.5;
  flex: 1 1 auto;
`;

const Title = styled.div`

`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`;

const Current = styled.div`

`;

const Related = styled.div`
`;

const RowsContainer = styled.div`
display: flex;
flex-direction: column;
`;

const Row = styled.div`
margin: 10px 0px;
display: flex;
flex-direction: row;
justify-content: space-between;
border-bottom: 1px solid black;
`;

const Column = styled.div`
display: flex;
`;

const Empty = styled.div`

`;

export default CompareModal;