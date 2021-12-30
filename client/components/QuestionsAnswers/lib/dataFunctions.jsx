import React from 'react';
import styled from 'styled-components';
import { MarkQuestionHelpfulAndReported } from '../MarkHelpfulAndReported.jsx';

export const months = {
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

export const sortedQuestion = (a, b) => {
  return a - b;
};

export const sortedAnswer = (a, b) => {
  return b.helpfulness - a.helpfulness;
};

export const QuestionBody = ({question}) => {
  return (
    <QuestionText><span>Q:{question.question_body}</span>
      <AlignRight>Add Answer</AlignRight>
      <MarkQuestionHelpfulAndReported question={question}/>
    </QuestionText>
  );
};

const AlignRight = styled.span`
  font-weight: normal;
  float: right;
  font-size: smaller;
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
`;
