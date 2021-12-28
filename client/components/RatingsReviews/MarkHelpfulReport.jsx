import React, { useState } from 'react';
import styled from 'styled-components';
import ls from 'local-storage';

import api from '../../api.js';

export const MarkHelpfulReport = ({ review, reFetch, product }) => {
  let alreadyMarked = (ls.get('markedReviews') || []).includes(review.review_id);
  let [alreadyReported, setAlreadyReported] = useState(
    (ls.get('reported') || []).includes(review.review_id)
  );

  let markAsHelpful = () => {
    let markedReviews = ls.get('markedReviews') || [];
    ls.set('markedReviews', [...markedReviews, review.review_id]);
    api
      .markReviewAsHelpful({ review_id: review.review_id })
      .then(() => reFetch(product.id))
      .catch((err) => console.error(err));

    //TODO - MAKE THIS RERENDER THE PAGE
  };

  let report = () => {
    let reported = ls.get('reported') || [];
    ls.set('reported', [...reported, review.review_id]);
    api
      .reportReview({ review_id: review.review_id })
      .then(() => setAlreadyReported(true))
      .catch((err) => console.error(err));
  };

  return (
    <Text>
      {alreadyMarked === true && <>✓ Helpful</>}
      {alreadyMarked === false && (
        <>
          Helpful? <a onClick={markAsHelpful}>Yes</a>
        </>
      )}{' '}
      ({review.helpfulness}){' | '}
      {alreadyReported === true && <>✓ Reported</>}
      {alreadyReported === false && <a onClick={report}>Report Review</a>}
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
