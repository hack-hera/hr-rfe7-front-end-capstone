import React, { useState } from 'react';
import styled from 'styled-components';
import ls from 'local-storage';

import api from '../../api.js';

export const MarkHelpfulReport = ({ review }) => {
  let alreadyMarked = (ls.get('markedReviews') || []).includes(
    review.review_id
  );

  console.log(review);

  let markAsHelpful = () => {
    let markedReviews = ls.get('markedReviews') || [];
    ls.set('markedReviews', [...markedReviews, review.review_id]);
    api
      .markReviewAsHelpful({ review_id: review.review_id })
      .then(() => console.log('yay -- time to rerender'))
      .catch((err) => console.error(err));

    //TODO - MAKE THIS RERENDER THE PAGE
  };

  let report = () => {
    console.log(review);
  };

  return (
    <Text>
      {alreadyMarked === true && <>✓ Helpful</>}
      {alreadyMarked === false && (
        <>
          Helpful? <a onClick={markAsHelpful}>Yes</a>
        </>
      )}
      {' | '}({review.helpfulness}){' | '}
      <a onClick={report}>Report</a>
    </Text>
  );
};

const Text = styled.div`
  margin: 0px 0px 10px 0px;
  padding: 0px;
  font-size: 0.7em;
  color: ${(props) => props.theme.textLight};
  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
