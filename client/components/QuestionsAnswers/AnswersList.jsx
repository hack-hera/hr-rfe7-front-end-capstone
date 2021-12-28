import React from 'react';
import styled from 'styled-components';
import { months } from './lib/dataFunctions.js';

const AnswersList = ({answers, answersShow, showMoreA}) => {

  return (
    <div>
      <Wrapper>
        <TitleA>A:</TitleA>
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
                <span>by {answer.answerer_name}, {months[timeArr[1]]} {timeArr[2] }, {timeArr[0]}&emsp;|&emsp;</span>
                <span>Helpful?{answer.helpfuless} <u>Yes</u>({answer.helpfulness})&emsp;|&emsp;</span>
                <span><u>Report</u></span>
              </ByUser>
            </div>
          );
        })}
        {answersShow < answers.length && <LoadMA onClick={showMoreA}>See more answers</LoadMA>}
      </Wrapper>
    </div>
  );
};

const Photos = styled.div`
  float: left;
`;

const ByUser = styled.div`
  clear: both;
  font-weight: 100;

`;

const Wrapper = styled.div`
  display: flex;
`;

const AnswerText = styled.div`
  display: block;
`;

const LoadMA = styled.div`
  font-weight: bold;
`;
const TitleA = styled.div`
  font-weight: bold;
`;

export default AnswersList;