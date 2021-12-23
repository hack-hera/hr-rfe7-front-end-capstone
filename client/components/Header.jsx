import React from 'react';
import { COLORS } from '../settings/colors';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Header = () => {
  return (
    <Navbar>
      <div>
        <h1>CatWalk</h1>
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
  color: ${COLORS.navbarText};
  height: 60px;
  background-color: ${COLORS.navbarBackground};
  h1 {
    font-size: 22px;
  }
  svg {
    color: ${COLORS.navbarText};
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: 0px;
  border-bottom: 2px solid ${COLORS.navbarText};
  margin-right: 20px;
  outline: none;
  color: ${COLORS.navbarText};
`;


export default Header;