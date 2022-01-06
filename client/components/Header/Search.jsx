import React, { useState } from 'react';
import styled from 'styled-components';

const Search = ({ items, updateProduct }) => {
  const [query, setQuery] = useState('');
  const [showing, setShowing] = useState(false);

  let display = items.filter((x) => new RegExp(query, 'i').test(x.name));
  return (
    <Container>
      <StyledInput
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowing(true)}
        onBlur={() => setShowing(false)}
      ></StyledInput>
      <IconSearch>&#x26B2;</IconSearch>
      {showing && (
        <Dropdown>
          <StyledUl>
            {display.map((x, i) => (
              <li
                key={i}
                onMouseDown={(e) => {
                  updateProduct(x.id);
                }}
              >
                {x.name}
              </li>
            ))}
          </StyledUl>
        </Dropdown>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div``;

const Dropdown = styled.div`
  position: fixed;
  right: 50px;
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

const StyledInput = styled.input`
  background-color: transparent;
  width: 200px;
  border: 0px;
  border-bottom: 2px solid ${(props) => props.theme.textInv};
  margin-right: 10px;
  outline: none;
  color: ${(props) => props.theme.textInv};
`;

const IconSearch = styled.span`
  transform: rotate(-45deg);
  font-style: bold;
  display: inline-block;
  font-size: 20px;
`;
