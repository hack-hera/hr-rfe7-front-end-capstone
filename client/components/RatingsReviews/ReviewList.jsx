import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';
import { sortReviews, keywordFilter } from '../../lib/reviewFunctions';
import { Button } from '../Shared/Form';

const ReviewList = ({ data, filters, addReview, product }) => {
  let display = data.reviews.filter((r) => filters[r.rating]);
  const [showing, setShowing] = useState(Math.min(2, display.length));
  const [sort, setSort] = useState('newest');
  const [keyword, setKeyword] = useState('');

  //Update the state if the user switches to a different product
  useEffect(() => {
    setShowing(Math.min(2, display.length));
  }, [product.id]);

  //sort based upon the default sort
  display = sortReviews(display, sort);

  //if the user searches for a keyword then dispaly
  if (keyword.length > 3) {
    display = keywordFilter(display, keyword);
  }

  //unfurl the list if there are >0 items to display
  if (showing === 0 && display.length > 0) {
    setShowing(2);
  }

  return (
    <Container>
      <Header>
        Showing {Math.min(display.length, showing)} of {display.length} reviews
        | sorted by
        <Select onChange={(e) => setSort(e.target.value)}>
          <option value='newest'>newest</option>
          <option value='oldest'>oldest</option>
          <option value='ratingHigh'>highest rating</option>
          <option value='ratingLow'>lowest rating</option>
          <option value='helpful'>most helpful</option>
          <option value='relevant'>most relevant</option>
        </Select>
        <Input
          placeholder='keyword search'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Header>
      {display.slice(0, showing).map((r, i) => (
        <ReviewItem review={r} key={i} product={product} keyword={keyword} />
      ))}
      {showing < display.length && (
        <Button
          onClick={() =>
            setShowing(showing + Math.min(2, display.length - showing))
          }
        >
          Show More
        </Button>
      )}
      <Button onClick={addReview}>
        Add a Review &nbsp;<b>+</b>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding: 0px 20px 20px 10px;
`;

const Select = styled.select`
  color: ${(props) => props.theme.textLight};
  border: 0px;
  background-color: transparent;
  font-size: 1em;
  margin-left: 5px;
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
`;

const Input = styled.input`
  color: ${(props) => props.theme.textLight};
  border: 0px;
  background-color: transparent;
  font-size: 1em;
  margin-left: 5px;
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
  outline: 0px;
`;

export default ReviewList;
