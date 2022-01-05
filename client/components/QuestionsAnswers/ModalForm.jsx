import React, { useState } from 'react';
import styled from 'styled-components';

import AddPhotos from './AddPhotos.jsx';
import { Button } from '../Shared/Form';



export const AnswerModal = ({ product_name, handleClose, question, submitAnswerForm, answerBody, nickName, email, upload, photos, removePhoto }) => {

  return (
    <Container>
      <div>
        <div>
          <h3>Submit your answer <CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h3>
        </div>
        <div>{product_name} : {question.question_body}</div>
        <br/>
        <div>Your Answer Below*</div>
        <textarea rows="10" cols="100" maxLength="1000" onChange={answerBody} required>
        </textarea>
        <br/>
        <br/>
        <div>What is your nickname*</div>
        <input placeholder="Example: jack543!" type = "text" maxLength="60" onChange={nickName} required></input>
        <div>For privacy reasons, do not use your full name or email address.</div>
        <br/>
        <div>Your email*</div>
        <input placeholder="Example: jack@email.com" maxLength="60" onChange={email} required></input>
        <div>For authentication reasons, you will not be emailed.</div>
        <br/>
        <AddPhotos
          upload={upload}
          photos={photos}
          removePhoto={removePhoto}
        />
        <br/>
        <br/>
        <Button onClick={submitAnswerForm}>Submit your answer</Button>
      </div>
    </Container>
  );
};

export const QuestionModal = ({ product_name, handleClose, submitQuestionForm, questionBody, nickName, email }) => {
  return (
    <Container>
      <div>
        <div>
          <h3>Ask your question about the {product_name}<CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h3>
        </div>
        <br/>
        <div>Your Questiton*</div>
        <textarea rows="10" cols="100" maxLength="1000" onChange={questionBody} required></textarea>
        <br/>
        <br/>
        <div>What is your nickname*</div>
        <input placeholder="Example: jack11!" type = "text" maxLength="60" onChange={nickName} required></input>
        <div>For privacy reasons, do not use your full name or email address.</div>
        <br/>
        <div>Your email*</div>
        <input placeholder="Example: jack@email.com" maxLength="60" onChange={email} required></input>
        <div>For authentication reasons, you will not be emailed.</div>
        <br/>
        <Button onClick={submitQuestionForm}>Submit your question</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  z-index: 200;
  position:fixed;
  background: white;
  width: 80%;
  height: 80%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const Photos = styled.input`
  margin-bottom: 30px;
`;

const CloseButton = styled.span`
  margin-right: 20px;
  float: right;
  cursor: pointer;
`;

const ModalForm = styled.form`
  margin-left: 20px;
`;

