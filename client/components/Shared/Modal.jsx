import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ children, onClose }) => {
  return (
    <Container>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 1;
  padding: 20px;
  width: 50%;
  height: 50%;
  left: 25%;
  top: 10%;
  overflow: auto;
  box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.2);
  border-radius: 4px;
  background-color: ${(props) => props.theme.bg};
`;

const CloseButton = styled.button`
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

export default Modal;