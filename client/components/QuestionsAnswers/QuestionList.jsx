import React from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AddAnswer from './AddAnswerModal.jsx';
import { MarkQuestionHelpfulAndReported } from './MarkHelpfulAndReported.jsx';
import { Button } from '../Shared/Form';
import { sortedQuestion, QuestionBody } from './lib/dataFunctions.jsx';



class QuestionList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        {this.props.searchText.length < 3 && <div>
          {this.props.questions.sort(sortedQuestion).slice(0, this.props.questionsShow).map((question, i) => {
            const answers = Object.values(question.answers);
            return (
              <div key={i}>
                <QuestionText><span>Q:{question.question_body}</span>
                  <AddAnswer
                    product_name={this.props.product_name}
                    question={question}
                  />
                  <MarkQuestionHelpfulAndReported question={question} product_id={this.props.product_id}/>
                </QuestionText>
                <AnswersList
                  answers={answers}
                  answersShow={this.props.answersShow}
                  showMoreA={this.props.showMoreA}
                />
              </div>
            );
          })}
          {this.props.answeredQuestion.sort(sortedQuestion).slice(0, this.props.answeredQuestionShow).map((question, i) => {
            const answers = Object.values(question.answers);
            return (
              <div key={i}>
                <QuestionText><span>Q:{question.question_body}</span>
                  <AddAnswer
                    product_name={this.props.product_name}
                    question={question}
                  />
                  <MarkQuestionHelpfulAndReported question={question}/>
                </QuestionText>
                <AnswersList
                  answers={answers}
                  answersShow={this.props.answersShow}
                  showMoreA={this.props.showMoreA}
                />
              </div>
            );
          })}
        </div>}
        {this.props.searchText.length >= 3 && <div>
          {this.props.searchQuestions.sort(sortedQuestion).slice(0, this.props.questionsShow).map((question, i) => {
            const answers = Object.values(question.answers);
            return (
              <div key={i}>
                <QuestionText><span>Q:{question.question_body}</span>
                  <AddAnswer
                    product_name={this.props.product_name}
                    question={question}
                  />
                  <MarkQuestionHelpfulAndReported question={question}/>
                </QuestionText>
                <AnswersList
                  answers={answers}
                  answersShow={this.props.answersShow}
                  showMoreA={this.props.showMoreA}
                />
              </div>
            );
          })}
          {this.props. answeredSearchQuestion.sort(sortedQuestion).slice(0, this.props.answeredQuestionShow).map((question, i) => {
            const answers = Object.values(question.answers);
            return (
              <div key={i}>
                <QuestionText><span>Q:{question.question_body}</span>
                  <AddAnswer
                    product_name={this.props.product_name}
                    question={question}
                  />
                  <MarkQuestionHelpfulAndReported question={question}/>
                </QuestionText>
                <AnswersList
                  answers={answers}
                  answersShow={this.props.answersShow}
                  showMoreA={this.props.showMoreA}
                />
              </div>
            );
          })}
        </div>}
        <Button onClick={this.props.showMoreQ}>MORE ANSWERED QUESTIONS</Button>
        <Button>ADD A QUESTION +</Button>
      </Container>
    );
  }
}


const Container = styled.div`
  color: ${(props) => props.theme.textLight};
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export default QuestionList;