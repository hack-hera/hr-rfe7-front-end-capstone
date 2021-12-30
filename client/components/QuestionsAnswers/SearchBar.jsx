import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = this.searchInput.bind(this);

    this.state = {
      searchText: ''
    };
  }

  searchInput(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Questions & Answers</h1>
        <SearchBox type='search' placeholder='Have a question? Search for answers...' onChange={this.searchInput}></SearchBox>
        <SearchButton type='submit'><FontAwesomeIcon icon={faSearch} /></SearchButton>
      </div>
    );
  }
}

const Container = styled.div`
  display: inline-block;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 10px 35px 10px 15px;
  border: none;
  border-radius: 100px;
  outline: none;
  height: 40px;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-left: -33px;
`;

export default SearchBar;