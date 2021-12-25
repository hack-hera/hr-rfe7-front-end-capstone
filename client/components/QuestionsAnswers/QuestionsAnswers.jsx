import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';

const Hidden = styled.div`
  display: none
`;

const AlignRight = styled.span`
  float: right
`;



class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    api.getQuestions({id: 37323, page: 1, count: 100})

      .then((res) => {
        console.log(res);
        this.setState({
          questions: res.results
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Questions & Answers</h1>
        <input type='text' placeholder='Enter your question here'></input>
        <button><FontAwesomeIcon icon={faSearch} /></button>
        <div>
          {this.state.questions.slice(0, 4).map((question, i) => {
            return (
              <div key={i}>
                <div>
                  <div>Q:{question.question_body} <AlignRight>Helpful?{question.question_helpfuless}</AlignRight></div>

                </div>
              </div>
            );
          })}
          {this.state.questions.slice(4, 100).map((question, i) => {
            return (
              <Hidden key={i} >
                <div>
                  <div>Q:{question.question_body} <span >Helpful?{question.question_helpfuless}</span></div>
                </div>
              </Hidden>
            );
          })}
        </div>
      </div>
    );

  }

}




const Header = styled.h1`
  color: ${props => props.theme.navbarText};
`;

export default QuestionsAnswers;