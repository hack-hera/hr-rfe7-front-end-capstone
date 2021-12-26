import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';


// const AnswerTitle = styled.div`
//   display: inline-block
// `

// const AnswerBody = styled.div`
//   display: inline-block
// `

const Wrapper = styled.div`
  display: flex

`;

const Photos = styled.div`
  float: left
`;

const ByUser = styled.div`
  clear: both
`;

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

`;



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
    var months = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };

    var questionsShow = this.state.questions.slice(0, 4).map((question) => {
      const answers = Object.values(question.answers);

      const answersShow = answers.slice(0, 2).map((answer) => {
        let timeArr = answer.date.split('T')[0].split('-');
        return (
          <div key={answer.id}>
            <div>{answer.body}</div>
            <div>
              {answer.photos.map((photo, index) => {
                return (
                  <Photos key={index}>
                    <img src={photo.index} alt='photo'/>
                  </Photos>
                );
              })}
            </div>
            <ByUser>
              <span>by {answer.answerer_name}, {months[timeArr[1]]} {timeArr[2]}, {timeArr[0]}&emsp;|&emsp;</span>
              <span>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})&emsp;|&emsp;</span>
              <span><YesLink onClick={this.addHelpful}>Report</YesLink></span>
            </ByUser>
          </div>
        );
      });

      const answersHidden = answers.slice(2, 100).map((answer) => {
        let timeArr = answer.date.split('T')[0].split('-');
        return (
          <div key={answer.id}>
            <div>{answer.body}</div>
            <div>
              {answer.photos.map((photo, index) => {
                return (
                  <Photos key={index}>
                    <img src={photo.index} alt='photo'/>
                  </Photos>
                );
              })}
            </div>
            <ByUser>
              <span>by {answer.answerer_name}, {months[timeArr[1]]} {timeArr[2]}, {timeArr[0]}&emsp;|&emsp;</span>
              <span>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})&emsp;|&emsp;</span>
              <span><YesLink onClick={this.addHelpful}>Report</YesLink></span>
            </ByUser>
          </div>
        );
      });

      return (
        <div key={question.question_id}>
          <div>Q: {question.question_body}
            <AlignRight>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})</AlignRight>
          </div>
          <Wrapper>
            <div>A:</div>
            <div>
              {answersShow}
              <AnswersHidden>
                {answersHidden}
              </AnswersHidden>
            </div>
          </Wrapper>
        </div>
      );
    });

    var questionsHidden = this.state.questions.slice(4, 100).map((question) => {
      const answers = Object.values(question.answers);


      return (
        <QuestionsHidden key={question.question_id}>
          <div>Q: {question.question_body}
            <AlignRight>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})</AlignRight>
          </div>

          <Wrapper>
            <div>A:</div>
            <div>
              {answers.slice(0, 2).map((answer) => {
                let timeArr = answer.date.split('T')[0].split('-');
                return (
                  <div key={answer.id}>
                    <div>{answer.body}</div>
                    <div>
                      {answer.photos.map((photo, index) => {
                        return (
                          <Photos key={index}>
                            <img src={photo.index} alt='photo'/>
                          </Photos>
                        );
                      })}
                    </div>
                    <ByUser>
                      <span>by {answer.answerer_name}, {months[timeArr[1]]} {timeArr[2]}, {timeArr[0]}&emsp;|&emsp;</span>
                      <span>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})&emsp;|&emsp;</span>
                      <span><YesLink onClick={this.addHelpful}>Report</YesLink></span>
                    </ByUser>
                  </div>
                );
              })}
              <AnswersHidden>
                {answers.slice(2, 100).map((answer) => {
                  let timeArr = answer.date.split('T')[0].split('-');
                  return (
                    <div key={answer.id}>
                      <div>{answer.body}</div>
                      <div>
                        {answer.photos.map((photo, index) => {
                          return (
                            <Photos key={index}>
                              <img src={photo.index} alt='photo'/>
                            </Photos>
                          );
                        })}
                      </div>
                      <ByUser>
                        <span>by {answer.answerer_name}, {months[timeArr[1]]} {timeArr[2]}, {timeArr[0]}&emsp;|&emsp;</span>
                        <span>Helpful?{question.question_helpfuless} <YesLink onClick={this.addHelpful}>Yes</YesLink>({question.question_helpfulness})&emsp;|&emsp;</span>
                        <span><YesLink onClick={this.addHelpful}>Report</YesLink></span>
                      </ByUser>
                    </div>
                  );
                })}
              </AnswersHidden>
            </div>
          </Wrapper>
        </QuestionsHidden>
      );
    });

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