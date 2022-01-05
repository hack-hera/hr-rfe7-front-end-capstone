import React, { useState } from 'react';
import styled from 'styled-components';
import Autocomplete from './Autocomplete';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import localforage from 'localforage';

export const Header = ({ product, products, updateProduct, toggleColors }) => {
  const [query, setQuery] = useState('');
  const [showing, setShowing] = useState(false);

  const clearCache = async () => {
    let sure = confirm('Are you sure?');
    if (sure) {
      await localforage.clear();
      alert('local storage cleared');
    }
  };

  return (
    <Navbar>
      <div>
        <h1>
          CatWalk <Toggle onClick={toggleColors}>&#9829;</Toggle>
          <Toggle onClick={clearCache}>&#128465;</Toggle>
        </h1>
      </div>
      <div>
        {product && (
          <select value={product.id} onChange={(e) => updateProduct(e.target.value)}>
            {products.map((x, i) => (
              <option key={x.id} value={x.id}>
                {x.id} - {x.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <StyledInput
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowing(true)}
          onBlur={() => setShowing(false)}
        ></StyledInput>
        <FontAwesomeIcon icon={faSearch} />
        {showing && query.length >= 1 && (
          <Autocomplete
            items={products}
            query={query}
            onClick={(id) => {
              setShowing(false);
              updateProduct(id);
            }}
          />
        )}
      </div>
    </Navbar>
  );
};

const Container = styled.div``;

const Navbar = styled.div`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 60px;
  padding: 0px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.textInv};

  background-color: ${(props) => props.theme.bgNav};
  h1 {
    font-size: 22px;
  }
  svg {
    color: ${(props) => props.theme.textInv};
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  width: 200px;
  border: 0px;
  border-bottom: 2px solid ${(props) => props.theme.textInv};
  margin-right: 20px;
  outline: none;
  color: ${(props) => props.theme.textInv};
`;

const Toggle = styled.a`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export default Header;
