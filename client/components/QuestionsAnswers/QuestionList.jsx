import React from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AddAnswer from './AddAnswerModal.jsx';
import AddQuestion from './AddQuestion.jsx';
import { MarkQuestionHelpfulAndReported } from './MarkHelpfulAndReported.jsx';
import { Button } from '../Shared/Form';
import { sortedQuestion, QuestionBody } from './lib/dataFunctions.jsx';



const QuestionList = ({ searchText, questions, questionShow, product_name, product_id, showMoreA, showMoreQ, searchQuestions, showLessQ, clicked, showLessA, fetchQuestionData }) => {

  return (

    <Container>
      {searchText.length < 3 && <ScrollDiv>
        {questions.sort(sortedQuestion).slice(0, questionShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <ListContainer key={i}>
              <QuestionText>
                <span>Q:{question.question_body}</span>
                <AddAnswer
                  product_name={product_name}
                  question={question}
                  product_id={product_id}
                  fetchQuestionData={fetchQuestionData}
                />
                <MarkQuestionHelpfulAndReported question={question} product_id={product_id}/>

              </QuestionText>
              <AnswersList
                answers={answers}
                showMoreA={showMoreA}
                clicked={clicked}
                showLessA={showLessA}
              />
            </ListContainer>
          );
        })}
      </ScrollDiv>}
      {searchText.length >= 3 && <ScrollDiv>
        {searchQuestions.sort(sortedQuestion).slice(0, questionShow).map((question, i) => {
          const answers = Object.values(question.answers);
          return (
            <div key={i}>
              <QuestionText>
                <span>Q:{question.question_body}</span>
                <AddAnswer
                  product_name={product_name}
                  question={question}
                  product_id={product_id}
                  fetchQuestionData={fetchQuestionData}
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
      </ScrollDiv>}
      <ButtonContainer>
        {questions.length > questionShow && <Button onClick={showMoreQ}>SEE MORE QUESTIONS</Button>}
        {questions.length === questionShow && <Button onClick={showLessQ}>COLLAPSE     QUESTIONS</Button>}
        <AddQuestion
          product_name={product_name}
          product_id={product_id}
          fetchQuestionData={fetchQuestionData}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ScrollDiv = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 600px;
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const ListContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
`;

export default QuestionList;