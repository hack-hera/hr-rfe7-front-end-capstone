import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${props => props.theme.bgLight};
  text-transform: uppercase;
  font-size: 0.8em;
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  outline: 1px solid ${props => props.theme.textLight};
`;

export const Dropdown = styled.select`
  background-color: ${props => props.theme.bgLight};
  text-transform: uppercase;
  font-size: 0.8em;
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  border-right: 10px solid transparent;
  outline: 1px solid ${props => props.theme.textLight};
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: ${props => props.theme.bgLight};
  text-transform: uppercase;
  font-size: 0.8em;
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  outline: 1px solid ${props => props.theme.textLight};
  cursor: pointer;
  :hover{
    background-color: ${props => props.theme.bgDark};
  }
`;