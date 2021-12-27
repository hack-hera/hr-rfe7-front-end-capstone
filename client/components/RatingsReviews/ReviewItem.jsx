import React from 'react';
import styled from 'styled-components';
import { LoremIpsum } from 'lorem-ipsum';
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
  review.summary = lorem.generateSentences(1);
  review.body = lorem.generateSentences(5);
  review.response = Math.random() > 0.5 ? lorem.generateSentences(2) : null;

  console.log(review);

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
        {review.response && (
          <Response>
            <b>Response:</b>
            <br />
            {review.response}
          </Response>
        )}
      </Body>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 10px 20px 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  margin: 0px;
  padding: 0px;
  font-size: 0.7em;
  color: ${(props) => props.theme.bodyTextLight};
  h1 {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const Response = styled.div`
  background-color: #ccc;
  margin-top: 10px;
  padding: 10px;
  font-size: 0.7em;
`;

const Body = styled.div`
  margin-top: 8px;
  line-height: 1.2em;
`;

export default ReviewItem;
