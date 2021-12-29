import React from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import { Button } from '../Shared/Form';


class QuestionList extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {
    return (
      <div>
        {this.props.questions.slice(0, this.props.questionsShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <div><QuestionBody>Q: {question.question_body}</QuestionBody>
                <AlignRight>Helpful? <u>Yes</u>({question.question_helpfulness})&emsp;|&emsp;<u>Add Answer</u></AlignRight>
              </div>
              <br/>
              <AnswersList
                answers={answers}
                answersShow={this.props.answersShow}
                showMoreA={this.props.showMoreA}
              />
              <br/>
            </div>
          );
        })}
        {this.props.answeredQuestion.slice(0, this.props.answeredQuestionShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <div><QuestionBody>Q: {question.question_body}</QuestionBody>
                <AlignRight>Helpful? <u>Yes</u>({question.question_helpfulness})&emsp;|&emsp;<u>Add Answer</u></AlignRight>
              </div>
              <br/>
              <AnswersList
                answers={answers}
                answersShow={this.props.answersShow}
                showMoreA={this.props.showMoreA}
              />
              <br/>
            </div>
          );
        })}

        <br/>
        <Button onClick={this.props.showMoreQ}>MORE ANSWERED QUESTIONS</Button>
        <Button>ADD A QUESTION +</Button>
      </div>
    );
  }
}








const AlignRight = styled.span`
  float: right
`;

const QuestionBody = styled.span`
  font-weight: bold
`;

export default QuestionList;