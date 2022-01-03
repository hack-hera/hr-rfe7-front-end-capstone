import React from 'react';
import styled from 'styled-components';

const Autocomplete = ({ items, onClick, query }) => {
  let display = items.filter((x) => new RegExp(query, 'i').test(x.name));
  return (
    <Container>
      <StyledUl>
        {display.map((x, i) => (
          <li
            key={i}
            onMouseDown={(e) => {
              onClick(x.id);
            }}
          >
            {x.name}
          </li>
        ))}
      </StyledUl>
    </Container>
  );
};

export default Autocomplete;

const Container = styled.div`
  position: fixed;
  right: 60px;
  top: 60px;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 200px;
  z-index: 10;
  background-color: ${(props) => props.theme.bgNav};
  color: ${(props) => props.theme.textInv};
`;

const StyledUl = styled.ul`
  background-color: ${(props) => props.theme.bgNav};
  padding: 0px;
  margin: 0px;
  li {
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0px 15px;
    height: 24px;
    line-height: 24px;
    font-size: 0.8em;
  }
  li:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.graph};
  }
`;
