import React from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import { Button } from '../Shared/Form';
import { MarkQuestionHelpfulAndReported } from './MarkHelpfulAndReported.jsx';


class QuestionList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        {this.props.questions.sort((a, b) => { return (a - b); } ).slice(0, this.props.questionsShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionBody><span>Q:{question.question_body}</span>
                <AlignRight>Add Answer</AlignRight>
                <MarkQuestionHelpfulAndReported question={question}/>
              </QuestionBody>
              <AnswersList
                answers={answers}
                answersShow={this.props.answersShow}
                showMoreA={this.props.showMoreA}
              />
            </div>
          );
        })}
        {this.props.answeredQuestion.sort(this.sortFunction).slice(0, this.props.answeredQuestionShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionBody><span>Q:{question.question_body}</span>
                <AlignRight>Add Answer</AlignRight>
                <MarkQuestionHelpfulAndReported question={question}/>
              </QuestionBody>
              <AnswersList
                answers={answers}
                answersShow={this.props.answersShow}
                showMoreA={this.props.showMoreA}
              />
            </div>
          );
        })}
        <Button onClick={this.props.showMoreQ}>MORE ANSWERED QUESTIONS</Button>
        <Button>ADD A QUESTION +</Button>
      </div>
    );
  }
}

const AlignRight = styled.span`
  font-weight: normal;
  float: right;
  font-size: smaller;
`;

const QuestionBody = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;

`;

export default QuestionList;