import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';

const QuestionsHidden = styled.div`
  display: none
`;

const AnswersHidden = styled.div`
  display: none
`;

const AlignRight = styled.span`
  float: right
`;

const YesLink = styled.u`

`



class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.addHelpful = this.addHelpful.bind(this);

    this.state = {
      answers: [],
      questions: []
    };
  }

  componentDidMount() {
    api.getQuestions({id: 37323, page: 1, count: 100})
      .then((res) => {
        this.setState({
          questions: res.results
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // getAnswers(question_id) {
  //   api.getAnswers({question_id: question_id, page: 1, count: 10})
  //     .then((res) => {
  //       console.log(res)
  //       this.setState({
  //         answers: res.results
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }




  addHelpful() {
    //to change

  }

  render() {
    let {questions} = this.state;
    var questionsShow = this.state.questions.slice(0, 4).map((question) => {

      const answers = Object.values(question.answers);

      return (
        <div key={question.question_id}>
          <div>Q: {question.question_body}
            <AlignRight>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})</AlignRight>
          </div>
          <div>
            {answers.slice(0, 2).map((answer) => {
              return (
                <div key={answer.id}>A: {answer.body}</div>
              )
            })}
          </div>
          <AnswersHidden>
            {answers.slice(2, 100).map((answer) => {
              return (
                <div key={answer.id}>A: {answer.body}</div>
              )
            })}
          </AnswersHidden>


        </div>
      );
    })

    var questionsHidden = this.state.questions.slice(4, 100).map((question) => {
      return (
        <QuestionsHidden key={question.question_id} >
          <div>
            <div>Q:{question.question_body} <span >Helpful?{question.question_helpfuless}</span></div>
          </div>
        </QuestionsHidden>
      );
    })


    return (
      <div>
        <h1>Questions & Answers</h1>
        <input type='text' placeholder='Enter your question here'></input>
        <button><FontAwesomeIcon icon={faSearch} /></button>
        <div>
          {questionsShow}
          {questionsHidden}
        </div>
      </div>
    );

  }

}




const Header = styled.h1`
  color: ${props => props.theme.navbarText};
`;

export default QuestionsAnswers;