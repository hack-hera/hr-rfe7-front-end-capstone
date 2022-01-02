import React, { Component } from 'react';
import styled from 'styled-components';

const ScrollToReviews = (props) => {
  return (
    <Container href="#top">
      Read all {props.allRatings} reviews
    </Container>
  );
};

export default ScrollToReviews;

const Container = styled.a`
  padding-left: 8px;
  scroll-behavior: smooth;
`;