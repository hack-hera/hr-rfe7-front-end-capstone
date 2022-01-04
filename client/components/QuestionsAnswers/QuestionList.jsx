import React from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AddAnswer from './AddAnswerModal.jsx';
import AddQuestion from './AddQuestion.jsx';
import { MarkQuestionHelpfulAndReported } from './MarkHelpfulAndReported.jsx';
import { Button } from '../Shared/Form';
import { sortedQuestion, QuestionBody } from './lib/dataFunctions.jsx';



const QuestionList = ({ searchText, questions, questionsShow, product_name, product_id, showMoreA, showMoreQ, answeredQuestionShow, answeredQuestion, searchQuestions, answeredSearchQuestion, showLessQ, clicked, showLessA }) => {

  return (

    <Container>
      {searchText.length < 3 && <div>
        {questions.sort(sortedQuestion).slice(0, questionsShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionText><span>Q:{question.question_body}</span>
                <AddAnswer
                  product_name={product_name}
                  question={question}
                  question_id={question.question_id}

                />
                <MarkQuestionHelpfulAndReported question={question} product_id={product_id}/>
              </QuestionText>
              <AnswersList
                answers={answers}
                showMoreA={showMoreA}
                clicked={clicked}
                showLessA={showLessA}
              />
            </div>
          );
        })}
        {answeredQuestion.sort(sortedQuestion).slice(0, answeredQuestionShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionText><span>Q:{question.question_body}</span>
                <AddAnswer
                  product_name={product_name}
                  question={question}
                  question_id={question.question_id}
                />
                <MarkQuestionHelpfulAndReported question={question}/>
              </QuestionText>
              <AnswersList
                answers={answers}
                showMoreA={showMoreA}
                clicked={clicked}
                showLessA={showLessA}
              />
            </div>
          );
        })}
      </div>}
      {searchText.length >= 3 && <div>
        {searchQuestions.sort(sortedQuestion).slice(0, questionsShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionText><span>Q:{question.question_body}</span>
                <AddAnswer
                  product_name={product_name}
                  question={question}
                  question_id={question.question_id}
                />
                <MarkQuestionHelpfulAndReported question={question}/>
              </QuestionText>
              <AnswersList
                answers={answers}
                showMoreA={showMoreA}
                clicked={clicked}
                showLessA={showLessA}
              />
            </div>
          );
        })}
        {answeredSearchQuestion.sort(sortedQuestion).slice(0, answeredQuestionShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionText><span>Q:{question.question_body}</span>
                <AddAnswer
                  product_name={props.product_name}
                  question={question}
                  question_id={question.question_id}
                />
                <MarkQuestionHelpfulAndReported question={question}/>
              </QuestionText>
              <AnswersList
                answers={answers}
                showMoreA={showMoreA}
                clicked={clicked}
                showLessA={showLessA}
              />
            </div>
          );
        })}
      </div>}
      <Button onClick={showMoreQ}>MORE ANSWERED QUESTIONS</Button>
      <Button onClick={showLessQ}>COLLAPSE QUESTIONS</Button>
      <AddQuestion product_name={product_name}/>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export default QuestionList;