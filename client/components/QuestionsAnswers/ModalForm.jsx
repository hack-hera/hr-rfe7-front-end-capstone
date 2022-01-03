import React from 'react';
import styled from 'styled-components';



export const AnswerModal = ({ product_name, handleClose, question, submitForm}) => {

  return (
    <Container>
      <ModalForm action="" method="post" enctype="multipart/form-data">
        <div>
          <ProductName>{product_name}</ProductName>
          <CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton>
        </div>
        <div>{question.question_body}</div>
        <br/>
        <div>Your Answer Below*</div>
        <textarea rows="10" cols="100" maxLength="1000" required></textarea>
        <br/>
        <br/>
        <div>What is your nickname*</div>
        <input placeholder="Example: jack543!" type = "text" maxLength="60" required></input>
        <div>For privacy reasons, do not use your full name or email address.</div>
        <br/>
        <div>Your email*</div>
        <input placeholder="Example: jack@email.com" maxLength="60" required></input>
        <div>For authentication reasons, you will not be emailed.</div>
        <br/>

        <input type="file" name="my_file[]" multiple></input>
        <input type="submit" value="Upload"></input>

        <br/>
        <br/>
        <button onClick={submitForm}>Submit</button>
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

const ProductName = styled.span`
  text-align: center;
`;

const CloseButton = styled.span`
  margin-right: 20px;
  float: right;
  cursor: pointer;
`;

const ModalForm = styled.form`
  margin-left: 20px;
`;

