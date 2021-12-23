import React from 'react';
import { faStar as full, faStarHalfAlt as half } from '@fortawesome/free-solid-svg-icons';
import { faStar as empty } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

/****************
 * Give a star number
 * Render a star component
 ****************/
export const Stars = ({ number }) => {

  //fix number to make sure its [0 - 5] and an even multiple of 0.5
  number = Math.max(0, Math.min(5, Math.round(number * 2) / 2));

  return (
    <div>
      <FontAwesomeIcon icon={number >= 1 ? full : number === 0.5 ? half : empty} />
      <FontAwesomeIcon icon={number >= 2 ? full : number === 1.5 ? half : empty} />
      <FontAwesomeIcon icon={number >= 3 ? full : number === 2.5 ? half : empty} />
      <FontAwesomeIcon icon={number >= 4 ? full : number === 3.5 ? half : empty} />
      <FontAwesomeIcon icon={number === 5 ? full : number === 4.5 ? half : empty} />
    </div>
  );
};