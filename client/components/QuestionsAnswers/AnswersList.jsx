import React, { useState } from 'react';
import styled from 'styled-components';
import { months } from './lib/dataFunctions.jsx';
import api from '../../api.js';
import { MarkAnswerHelpfulAndReported } from './MarkHelpfulAndReported.jsx';
import { sortedAnswer } from './lib/dataFunctions.jsx';


const AnswersList = ({ answers, showMoreA, clicked, showLessA }) => {

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState();

  const largerPhoto = (e) => {
    setShow(true);
    setUrl(e.target.src);
  };


  if (clicked === false) {
    return (
      <Container>
        {show === true && (
          <LargerContainer >
            <img src={url} onClick={() => setShow(false)}/>
          </LargerContainer>)}
        <AnswerContainer>
          {answers.length > 0 && <TitleA>A:</TitleA>}
          <AnswerContent>
            {answers.sort(sortedAnswer).slice(0, 2).map((answer, i) => {
              let timeArr = answer.date.split('T')[0].split('-');
              return (
                <div key={i}>
                  <div>{answer.body}</div>
                  <div>
                    {answer.photos.map((photo, i) => {
                      return (
                        <Photos key={i}>
                          <img src={photo} alt='photo' onClick={(e) => largerPhoto(e)}
                          />
                        </Photos>
                      );
                    })}
                  </div>
                  <ByUser>
                    <span>by { answer.answerer_name }, { months[timeArr[1]] } { timeArr[2] }, { timeArr[0] }&emsp;|&emsp;</span>
                    <MarkAnswerHelpfulAndReported answer={answer}/>
                  </ByUser>
                </div>
              );
            })}
            {answers.length > 2 && <LoadMA onClick={ showMoreA }>See more answers</LoadMA>}
          </AnswerContent>
        </AnswerContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <AnswerContainer>
          {answers.length > 0 && <TitleA>A:</TitleA>}
          <AnswerContent>
            {answers.sort(sortedAnswer).map((answer, i) => {
              let timeArr = answer.date.split('T')[0].split('-');
              return (
                <div key={i}>
                  <div>{answer.body}</div>
                  <div>
                    {answer.photos.map((photo, i) => {
                      return (
                        <Photos key={i} onClick={() => setShow(true)}>
                          <img src={photo} alt='photo'/>
                        </Photos>
                      );
                    })}
                  </div>
                  <ByUser>
                    <span>by { answer.answerer_name }, { months[timeArr[1]] } { timeArr[2] }, { timeArr[0] }&emsp;|&emsp;</span>
                    <MarkAnswerHelpfulAndReported answer={answer}/>
                  </ByUser>
                </div>
              );
            })}
            <LoadMA onClick={ showLessA }>Collapse answers</LoadMA>
          </AnswerContent>
        </AnswerContainer>
      </Container>
    );
  }

};

const Photos = styled.div`
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    height: 60px;
    margin-right: 15px;
  }
`;

const LargerContainer = styled.div`
  z-index: 200;
  position: fixed;
  width: 80%;
  height: 80%;
  top:60%;
  left:60%;
  transform: translate(-50%,-50%);
  img {
    width: 80%;
    height: 80%;
  }

`;

const ByUser = styled.div`
  clear: both;
  font-size: smaller;
  margin-bottom: 20px;
`;

const AnswerContainer = styled.div`
  display: flex;
`;

const LoadMA = styled.div`
  display: block;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;

`;
const TitleA = styled.div`
  font-weight: bold;
  flex-direction: column;
`;

const AnswerContent = styled.div`
  flex-direction: column;
`;

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
  flex-direction: column;
`;

export default AnswersList;