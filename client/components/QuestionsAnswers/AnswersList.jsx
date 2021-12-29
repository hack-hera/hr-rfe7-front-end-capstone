import React from 'react';
import styled from 'styled-components';
import { months } from './lib/dataFunctions.js';

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
                <AnswerText>{answer.body}</AnswerText>
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
                  <span>by {answer.answerer_name}, {months[timeArr[1]]} {timeArr [2] }, {timeArr[0]}&emsp;|&emsp;</span>
                  <span>Helpful?{answer.helpfuless} <u >Yes</u>({answer.helpfulness})&emsp;|&emsp;</span>
                  <span><u>Report</u></span>
                </ByUser>
              </div>
            );
          })}
        </AnswerContent>
        {answersShow < answers.length && <LoadMA onClick={showMoreA}>See more answers</LoadMA>}
      </AnswerContainer>
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
  flex-direction: row;
`;

const AnswerText = styled.div`
  display: block;
`;

const LoadMA = styled.div`
  font-weight: bold;
`;
const TitleA = styled.div`
  font-weight: bold;
  width: 10%;
`;

const AnswerContent = styled.div`
  width: 90%;
`;

const Container = styled.div`
  flex-direction: column;
`;

export default AnswersList;