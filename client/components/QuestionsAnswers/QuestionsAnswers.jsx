import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';



class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    api.getQuestions({id: 37312})
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
          {this.state.questions.map((question, i) => {
            return (
              <div key={i} size='4'>
                <div>Q:{question.question_body} <span>Helpful?{question.question_helpfuless}</span></div>
              </div>
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