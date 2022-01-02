import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

var XButton = (props) => {
  return (
    <Button>
      <FontAwesomeIcon icon={faTimesCircle} />
    </Button>
  );
};

const Button = styled.div`

`;

export default XButton;