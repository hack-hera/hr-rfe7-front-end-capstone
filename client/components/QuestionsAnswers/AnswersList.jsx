import React from 'react';
import styled from 'styled-components';
import { months } from './lib/dataFunctions.js';
import api from '../../api.js';
import MarkHelpful from './MarkHelpfulAndReported.jsx';

const AnswersList = ({answers, answersShow, showMoreA}) => {

  return (
    <Container>
      <AnswerContainer>
        <TitleA>A:</TitleA>
        <AnswerContent>
          {answers.slice(0, answersShow).map((answer, i) => {
            let timeArr = answer.date.split('T')[0].split('-');
            return (
              <div key={i}>
                <div>{answer.body}</div>
                <div>
                  {answer.photos.map((photo, index) => {
                    return (
                      <Photos key={index}>
                        <img src={photo.url} alt='photo'/>
                      </Photos>
                    );
                  })}
                </div>
                <ByUser>
                  <span>by { answer.answerer_name }, { months[timeArr[1]] } { timeArr[2] }, { timeArr[0] }&emsp;|&emsp;</span>
                  {/* <span>Helpful?{answer.helpfuless} <u >Yes</u>({answer.helpfulness})&emsp;|&emsp;</span> */}
                  <MarkHelpful answer={answer}/>
                  <span><u>Report</u></span>
                </ByUser>
              </div>
            );
          })}
        </AnswerContent>
      </AnswerContainer>
      {answersShow < answers.length && <LoadMA onClick={ showMoreA }>See more answers</LoadMA>}
    </Container>
  );
};

const Photos = styled.div`
  float: left;
`;

const ByUser = styled.div`
  clear: both;
  font-weight: 100;
`;

const AnswerContainer = styled.div`
  display: flex;
`;

const LoadMA = styled.div`
  clear: both;
  font-weight: bold;
`;
const TitleA = styled.div`
  font-weight: bold;
  flex-direction: column;
`;

const AnswerContent = styled.div`
  flex-direction: column;
`;

const Container = styled.div`
  flex-direction: column;
`;

export default AnswersList;