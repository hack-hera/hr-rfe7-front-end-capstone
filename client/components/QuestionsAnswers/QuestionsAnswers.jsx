import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    axios.get('/qa/questions')
      .then((data) => {
        this.setState({
          questions: data.results
        })
      })
      .catch((err) => {
        console.log(err)
      })
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
                <div>{question.question_body}</div>
                <div>Helpful?<a href="#">Yes</a>(1){question.results.question_helpfuless}</div>
              </div>
            )
          })}
        </div>


      </div>
    )

  }

}




const Header = styled.h1`
  color: ${props => props.theme.navbarText};
`;

export default QuestionsAnswers;