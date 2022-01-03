import React from 'react';
import styled from 'styled-components';
import { Button } from '../Shared/Form';



export const AnswerModal = ({ product_name, handleClose, question, submitForm, answerBody, nickName, email}) => {

  return (
    <Container>
      <ModalForm action="" method="post" enctype="multipart/form-data">
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

        <Photos type="file" name="my_file[]" multiple></Photos>

        <br/>
        <br/>
        <Button onClick={submitForm}>Submit your answer</Button>
      </ModalForm>
    </Container>
  );
};



export const QuestionModal = ({product_name, handleClose}) => {
  return (
    <Container>
      <ModalForm action="" method="post" enctype="multipart/form-data">
        <div>
          <h3>Ask your question about the {product_name}<CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h3>
        </div>
        <br/>
        <div>Your Questiton*</div>
        <textarea rows="10" cols="100" maxLength="1000" required></textarea>
        <br/>
        <br/>
        <div>What is your nickname*</div>
        <input placeholder="Example: jack11!" type = "text" maxLength="60" required></input>
        <div>For privacy reasons, do not use your full name or email address.</div>
        <br/>
        <div>Your email*</div>
        <input placeholder="Example: jack@email.com" maxLength="60" required></input>
        <div>For authentication reasons, you will not be emailed.</div>

        <br/>
        <Button >Submit your question</Button>
      </ModalForm>
    </Container>
  );
};

const Container = styled.div`
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

