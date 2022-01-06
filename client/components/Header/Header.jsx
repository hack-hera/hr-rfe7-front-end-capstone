import React, { useState } from 'react';
import styled from 'styled-components';
import Search from './Search';
import localforage from 'localforage';

export const Header = ({ product, products, updateProduct, toggleColors }) => {
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
        <Search items={products} updateProduct={updateProduct} />
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

const Toggle = styled.a`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export default Header;
