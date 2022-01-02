import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

var StarButton = (props) => {
  return (
    <Button>
      <FontAwesomeIcon icon={faStar} />
    </Button>
  );
};

const Button = styled.div`

`;

export default StarButton;