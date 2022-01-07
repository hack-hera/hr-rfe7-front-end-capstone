import React from 'react';
import styled from 'styled-components';

var CompareModal = (props) => {
  const relatedFeatArr = props.related.features.reduce(
    (result, current) => result.concat(current.feature),
    []
  );
  const currentFeatArr = props.current.features.reduce(
    (result, current) => result.concat(current.feature),
    []
  );

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
          <Column>{current}</Column>
          <Column>{char}</Column>
          <Column>{related}</Column>
        </Row>
      );
    } else {
      return (
        <Row key={index}>
          <Column></Column>
          <Column>{char}</Column>
          <Column></Column>
        </Row>
      );
    }
  });

  return (
    <Container>
      <Title>Comparing</Title>
      <Table>
        <Header>
          <Current>{props.current.name}</Current>
          <Empty />
          <Related>{props.related.name}</Related>
        </Header>
        <RowsContainer>{characteristics}</RowsContainer>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;
// bgLight

const Table = styled.div``;

const Title = styled.div`
  padding: 5px 0px;
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin: 10px 0px;
`;

const Current = styled.div`
  margin: 0px 40px;
`;

const Related = styled.div`
  margin: 0px 40px;
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
`;

const Row = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  margin: 0px 40px;
`;

const Empty = styled.div`
  width: 10px;
  height: 10px;
`;

export default CompareModal;
