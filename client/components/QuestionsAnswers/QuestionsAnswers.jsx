import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';
import QuestionList from './QuestionList.jsx';



class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsShow: 2,
      answersShow: 2,
      questions: [],
      answers: []
    };
  }

  // componentDidMount() {
  //   api.getQuestions({product_id: 37323, page: 1, count: 100})
  //     .then((res) => {
  //       this.setState({
  //         questions: res.results
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }



  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getQuestions({ product_id: 37323, count: 100 }).then((res) => {
        this.setState({ questions: res.results });
      });
      // api.getAnswers({ question_id: id }).then((res) => {
      //   this.setState({ answers: res.results });
      // });
    }
  }

  render() {
    const {questionsShow, answersShow, questions, answers} = this.state;

    return (
      <div>
        <h1>Questions & Answers</h1>
        <input type='text' placeholder='Enter your question here'></input>
        <button><FontAwesomeIcon icon={faSearch} /></button>
        <div>
          <QuestionList
            questions={questions}
            questionsShow={questionsShow}
            answersShow={answersShow}
            showMoreA={() => this.setState({answersShow: answersShow + 2})}
            showMoreQ={() => this.setState({questionsShow: questionsShow + 2})}
          />
        </div>
      </div>
    );
  }
}





export default QuestionsAnswers;