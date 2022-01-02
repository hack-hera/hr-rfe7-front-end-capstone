import React from 'react';
import styled from 'styled-components';

var CompareModal = (props) => {
  const relatedFeatArr = props.related.features.reduce((result, current) => result.concat(current.feature), []);
  const currentFeatArr = props.current.features.reduce((result, current) => result.concat(current.feature), []);

  var unique = (array) => {
    var a = array.slice();
    for (var i = 0; i < a.length; i++) {
      for (var j = i + 1; j < a.length; j++) {
        if (a[i] === a[j]) {
          a.splice(j - 1, 1);
        }
      }
    }
    return a;
  };

  const allFeats = unique(relatedFeatArr.concat(currentFeatArr));
  console.log(allFeats);

  const characteristics = allFeats.map((feature, index) => {
    return (
      <Row key={index}>{feature}</Row>
    );
  });

  let hasFeature = false;
  for (var i = 0; i < relatedFeatArr.length; i++) {
    if (currentFeatArr.includes(relatedFeatArr[i])) {
      hasFeature = true;
      break;
    }
  }

  var currFeats;
  var relateFeats;

  if (hasFeature) {
    currFeats = currentFeatArr.map((feature, index) => {
      return (
        <Row key={index}>{feature}</Row>
      );
    });
    relateFeats = relatedFeatArr.map((feature, index) => {
      return (
        <Row key={index}>{feature}</Row>
      );
    });
  } else {
    currFeats = <Row></Row>;
    relateFeats = <Row></Row>;
  }

  console.log(currFeats);
  console.log(relateFeats);

  return (
    <Container>
      <Title>Comparing</Title>
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
        <CurrentFeatures>
          {currFeats}
        </CurrentFeatures>
        <Characteristics>
          {characteristics}
        </Characteristics>
        <RelatedFeatures>
          {relateFeats}
        </RelatedFeatures>
      </RowsContainer>
    </Container >
  );
};

const Container = styled.div`

`;

const Title = styled.div`

`;

const Header = styled.div`

`;

const Current = styled.div`

`;

const Related = styled.div`

`;

const CurrentFeatures = styled.div`

`;

const Characteristics = styled.div`

`;

const RelatedFeatures = styled.div`

`;

const FirstRow = styled.div`

`;

const RowsContainer = styled.div`

`;

const Row = styled.div`

`;

const Empty = styled.div`

`;

export default CompareModal;