import React from 'react';
import { COLORS, THEMES } from '../settings/colors';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = ({ product, products, updateProduct, toggleColors }) => {
  if (!product) {
    return <></>;
  }

  return (
    <Navbar>
      <div>
        <h1>
          CatWalk <Toggle onClick={toggleColors}>&#9829;</Toggle>
        </h1>
      </div>
      <div>
        <select
          defaultValue={product.id}
          onChange={(e) => updateProduct(e.target.value)}
        >
          {products.map((x, i) => (
            <option key={x.id} value={x.id}>
              {x.id} - {x.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <StyledInput type='text'></StyledInput>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </Navbar>
  );
};

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100%-50px);
  padding: 0px 25px;
  align-items: center;
  color: ${(props) => props.theme.textInv};
  height: 60px;
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
