import React from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import { Button } from '../Shared/Form';

const QuestionList = ({questions, questionsShow, answersShow, showMoreA, showMoreQ}) => {

  return (
    <div>
      {questions.slice(0, questionsShow).map((question, i) => {
        const answers = Object.values(question.answers);
        return (
          <div key={i}>
            <div><QuestionBody>Q: {question.question_body}</QuestionBody>
              <AlignRight>Helpful? <u>Yes</u>({question.question_helpfulness})&emsp;|&emsp;<u>Add Answer</u></AlignRight>
            </div>
            <AnswersList
              answers={answers}
              answersShow={answersShow}
              showMoreA={showMoreA}
            />
          </div>
        );
      })}
      {questionsShow < questions.length && <Button onClick={showMoreQ}>MORE ANSWERED QUESTIONS</Button>}
      <Button>ADD A QUESTION +</Button>
    </div>
  );
};

const AlignRight = styled.span`
  float: right
`;

const QuestionBody = styled.span`
  font-weight: bold
`;

export default QuestionList;