import React from 'react';
import styled from 'styled-components';
import api from '../../api.js';
import ls from 'local-storage';

export const MarkAnswerHelpfulAndReported = ({answer}) => {

  let answerHelpfulMarked = (ls.get('markedAnswers') || []).includes(answer.id);
  let answerReportMarked = (ls.get('markedAnswersReport') || []).includes(answer.reported);

  let MarkAnswerHelpful = () => {
    let markedAnswers = ls.get('markedAnswers') || [];
    ls.set('markedAnswers', [...markedAnswers, answer.id]);
    api.markAnswerAsHelpful({answer_id: answer.id});
  };

  let MarkAnswerReported = () => {
    let markedReported = ls.get('markedReported' || []);
    ls.get('markedReported', [markedReported, answer.reported]);
    api.reportAnswer({answer_id: answer.id});
  };

  return (
    <span>
      <span>
        {answerHelpfulMarked === true && <>✓ Helpful {answer.helpfuless} <u>Yes</u>({answer.helpfulness})&emsp;|&emsp;</>}
        {answerHelpfulMarked === false && <span>Helpful?{answer.helpfuless} <u onClick={MarkAnswerHelpful}>Yes</u>({answer.helpfulness})&emsp;|&emsp;</span>}
      </span>
      <span>
        {answerReportMarked === true && <u>Reported</u>}
        {answerReportMarked === false && <u onClick={MarkAnswerReported}>Report</u>}
      </span>
    </span>
  );
};

export const MarkQuestionHelpfulAndReported = ({question, product_id}) => {

  let questionHelpfulMarked = (ls.get('markedQuestions') || []).includes(question.question_id);

  let MarkQuestionHelpful = () => {
    let markedQuestions = ls.get('markedQuestions') || [];
    ls.set('markedQuestions', [...markedQuestions, question.question_id]);
    api.markQuestionAsHelpful({question_id: question.question_id});

    // api.getQuestions({product_id: product_id, count: 100});
  };

  return (
    <AlignRight>
      {questionHelpfulMarked === true && <>✓ Helpful {question.question_helpfuless + 1} <u>Yes</u>({question.question_helpfulness + 1})&emsp;|&emsp;</>}
      {questionHelpfulMarked === false && <span>Helpful?{question.question_helpfuless} <u onClick={MarkQuestionHelpful}>Yes</u>({question.question_helpfulness})&emsp;|&emsp;</span>}
    </AlignRight>
  );
};

const AlignRight = styled.span`
  float: right;
  font-size: smaller;
  font-weight: normal;
`;




