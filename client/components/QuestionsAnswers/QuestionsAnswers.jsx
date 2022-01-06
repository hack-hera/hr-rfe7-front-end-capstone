import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';
import QuestionList from './QuestionList.jsx';
import SearchBar from './SearchBar.jsx';



class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionShow: 2,
      searchText: '',
      searchQuestions: [],
      clicked: false
    };

    this.searchInput = this.searchInput.bind(this);
  }

  searchInput(e) {
    this.setState({
      searchText: e.target.value,
      searchQuestions: this.props.data.results.filter(question => question.question_body.toLowerCase().indexOf(e.target.value) !== -1),
    });
  }

  render() {

    const { searchText, searchQuestions, clicked, questionShow } = this.state;

    return (
      <Container>
        <h3>Questions & Answers</h3>
        <SearchBar searchInput={this.searchInput}/>
        <div>
          <QuestionList
            product_id={this.props.data.product_id}
            product_name={this.props.product.name}
            questions={this.props.data.results}
            questionShow={questionShow}
            showMoreA={() => this.setState({clicked: true})}
            showMoreQ={() => this.setState({questionShow: this.props.data.results.length})}
            showLessQ={() => this.setState({questionShow: 2})}
            showLessA={() => this.setState({clicked: false})}
            searchText={searchText}
            searchQuestions={searchQuestions}
            clicked={clicked}
            fetchQuestionData={this.props.fetchQuestionData}
          />
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
`;

export default QuestionsAnswers;