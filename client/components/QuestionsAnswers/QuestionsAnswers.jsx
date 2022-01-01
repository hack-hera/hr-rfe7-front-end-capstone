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
      questionsShow: 2,
      answersShow: 2,
      questions: [],
      answeredQuestionShow: 0,
      answeredQuestion: [],
      searchText: '',
      searchQuestions: [],
      answeredSearchQuestion: []
    };

    this.searchInput = this.searchInput.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getQuestions({ product_id: 37323, count: 100 }).then((res) => {
        this.setState({
          questions: res.results,
          answeredQuestion: res.results.slice(2).filter(question => question.answers !== undefined)
        });
      });
    }
  }

  searchInput(e) {
    this.setState({
      searchText: e.target.value,
      searchQuestions: this.state.questions.filter(question => question.question_body.toLowerCase().indexOf(e.target.value) !== -1),
      answeredSearchQuestion: this.state.searchQuestions.slice(2).filter(question => question.answers !== undefined)
    });
  }

  render() {
    const {questionsShow, answeredQuestionShow, answersShow, questions, answeredQuestion, searchText, searchQuestions, answeredSearchQuestion} = this.state;

    return (
      <div>
        <SearchBar searchInput={this.searchInput}/>
        <div>
          <QuestionList
            questions={questions}
            questionsShow={questionsShow}
            answersShow={answersShow}
            answeredQuestionShow={answeredQuestionShow}
            answeredQuestion={answeredQuestion}
            showMoreA={() => this.setState({answersShow: answersShow + 2})}
            showMoreQ={() => this.setState({answeredQuestionShow: answeredQuestionShow + 2})}
            searchText={searchText}
            searchQuestions={searchQuestions}
            answeredSearchQuestion={answeredSearchQuestion}
          />
        </div>
      </div>
    );
  }
}




export default QuestionsAnswers;