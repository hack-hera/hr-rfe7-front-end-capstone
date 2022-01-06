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
      answeredQuestionShow: 0,
      answeredQuestion: [],
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
      answeredSearchQuestion: this.state.searchQuestions.slice(2).filter(question => question.answers !== undefined)
    });
  }

  render() {

    const { answeredQuestionShow, searchText, searchQuestions, answeredSearchQuestion, clicked } = this.state;

    return (
      <div>
        <h3>Questions & Answers</h3>
        <SearchBar searchInput={this.searchInput}/>
        <div>
          <QuestionList
            product_id={this.props.data.product_id}
            product_name={this.props.product.name}
            questions={this.props.data.results}
            questionsShow={2}
            answeredQuestionShow={answeredQuestionShow}
            answeredQuestion={this.props.data.results.slice(2).filter(question => Object.keys(question.answers).length > 0)}
            showMoreA={() => this.setState({clicked: true})}
            showMoreQ={() => this.setState({answeredQuestionShow: answeredQuestionShow + 2})}
            showLessQ={() => this.setState({answeredQuestionShow: 0})}
            showLessA={() => this.setState({clicked: false})}
            searchText={searchText}
            searchQuestions={searchQuestions}
            answeredSearchQuestion={answeredSearchQuestion}
            clicked={clicked}
            fetchQuestionData={this.props.fetchQuestionData}
          />
        </div>
      </div>
    );
  }
}




export default QuestionsAnswers;