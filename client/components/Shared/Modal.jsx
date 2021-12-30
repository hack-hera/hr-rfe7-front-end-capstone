import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Modal = ({ children, onClose, width = 50, height = 50 }) => {
  width = Math.max(10, Math.min(90, width));
  height = Math.max(10, Math.min(90, height));
  return (
    <Container width={width} height={height}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1;
  padding: 20px;
  width: calc(${(props) => props.width}% - 40px);
  height: calc(${(props) => props.height}% - 40px);
  left: calc(${(props) => (100 - props.width) / 2}% - 20px);
  top: calc(${(props) => Math.min(10, (100 - props.height) / 2)}% - 20px);
  overflow: auto;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgLight};
`;

const CloseButton = styled.button`
  color: ${(props) => props.theme.textDark};
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 40px;
  font-size: 2em;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
`;
