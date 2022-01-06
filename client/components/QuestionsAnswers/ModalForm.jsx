import React, { useState } from 'react';
import styled from 'styled-components';

import AddPhotos from './AddPhotos.jsx';
import { Button, Input } from '../Shared/Form';


export const AnswerModal = ({ product_name, handleClose, question, submitAnswerForm, answerBody, nickName, email, upload, photos, removePhoto }) => {

  return (
    <Container>
      <BodyContainer>
        <Label>
          <h2>Submit your answer <CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h2>
        </Label>
        <Label>{product_name} : {question.question_body}</Label>
        <br/>
        <Label>
          <div>Your Answer Below*</div>
          <TextArea rows="10" cols="100" maxLength="1000" onChange={answerBody} required>
          </TextArea>
        </Label>
        <Label>
          <div>What is your nickname*</div>
          <Input placeholder="Example: jack543!" type = "text" maxLength="60" onChange={nickName} required></Input>
          <div>For privacy reasons, do not use your full name or email address.</div>
        </Label>
        <Label>
          <div>Your email*</div>
          <Input placeholder="Example: jack@email.com" maxLength="60" onChange={email} required></Input>
          <div>For authentication reasons, you will not be emailed.</div>
        </Label>
        <Label>
          <AddPhotos
            upload={upload}
            photos={photos}
            removePhoto={removePhoto}
          />
        </Label>
        <br/>
        <br/>
        <Button onClick={submitAnswerForm}>Submit your answer</Button>
      </BodyContainer>
    </Container>
  );
};

export const QuestionModal = ({ product_name, handleClose, submitQuestionForm, questionBody, nickName, email }) => {
  return (
    <Container>
      <BodyContainer>
        <Label>
          <h2>Ask your question about the {product_name}<CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h2>
        </Label>
        <Label>
          <div>Your Questiton*</div>
          <TextArea rows="10" cols="100" maxLength="1000" onChange={questionBody} required></TextArea>
        </Label>
        <Label>
          <div>What is your nickname*</div>
          <Input placeholder="Example: jack11!" type = "text" maxLength="60" onChange={nickName} required></Input>
          <div>For privacy reasons, do not use your full name or email address.</div>
        </Label>
        <Label>
          <div>Your email*</div>
          <Input placeholder="Example: jack@email.com" maxLength="60" onChange={email} required></Input>
          <div>For authentication reasons, you will not be emailed.</div>
        </Label>
        <br/>
        <Button onClick={submitQuestionForm}>Submit your question</Button>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  z-index: 200;
  position:fixed;
  background: ${(props) => props.theme.bgLight};
  width: 70%;
  height: 80%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80%;

`;

const Label = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
  padding-bottom: 15px;
  padding-top: 15px;
`;

const Photos = styled.input`
  margin-bottom: 30px;
`;

const CloseButton = styled.span`
  margin-right: 20px;
  float: right;
  cursor: pointer;
`;

const BodyContainer = styled.div`
  margin-left: 20px;
`;

const TextArea = styled.textarea`
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textLight};
  outline: 1px solid ${(props) => props.theme.textLight};
`;

