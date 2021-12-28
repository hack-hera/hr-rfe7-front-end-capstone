import React from 'react';
import styled from 'styled-components';
import { LoremIpsum } from 'lorem-ipsum';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

import { Stars } from '../Shared/Stars';

//TODO - add some better date parsing logic

const ReviewItem = ({ review }) => {
  // review.summary = lorem.generateSentences(1);
  // review.body = lorem.generateSentences(5);
  // review.response = Math.random() > 0.5 ? lorem.generateSentences(2) : null;

  return (
    <Container>
      <Header>
        <Text>
          <Stars number={review.rating} />
        </Text>
        <Text>
          {review.reviewer_name}, {review.date.substr(0, 10)}
        </Text>
      </Header>
      <Body>
        <Text>
          <h1>{review.summary}</h1>
        </Text>
        <Text>{review.body}</Text>
        {review.recommend === true && (
          <Text>
            <b>✓</b> I recommend this product
          </Text>
        )}
        {review.response && (
          <Response>
            <b>Response:</b>
            <br />
            {review.response}
          </Response>
        )}
        <Text>Helpful? Yes (10) | Report</Text>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px 0px 20px 0px;
  padding: 0px 10px 10px 10px;
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  margin: 0px 0px 10px 0px;
  padding: 0px;
  font-size: 0.7em;
  color: ${(props) => props.theme.textLight};
  h1 {
    font-size: 1.1em;
    font-weight: bold;
  }
`;

const Response = styled.div`
  background-color: ${(props) => props.theme.bgDark};
  margin: 10px 0px 5px 0px;
  padding: 10px;
  font-size: 0.7em;
`;

const Body = styled.div`
  margin-top: 8px;
  line-height: 1em;
`;

export default ReviewItem;
