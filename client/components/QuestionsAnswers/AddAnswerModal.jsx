import React from 'react';
import styled from 'styled-components';
import api from '../../api.js';
import { AnswerModal } from './ModalForm.jsx';
import { formValidation } from './lib/dataFunctions';



class AddAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      name: '',
      email: '',
      show: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.answerBody = this.answerBody.bind(this);
    this.nickNameOnChange = this.nickNameOnChange.bind(this);
    this.emailOnChange = this.emailOnChange.bind(this);
    this.submitAnswerForm = this.submitAnswerForm.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  answerBody(e) {
    this.setState({
      answer: e.target.value
    });
  }

  nickNameOnChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  emailOnChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  submitAnswerForm() {
    let formData = {question_id: this.props.question.question_id,
      body: this.state.answer,
      name: this.state.name,
      email: this.state.email,
      photos: []
    };

    let currentErrors = formValidation(formData);

    if (Object.keys(currentErrors).length === 0) {
      api.addAnswer(formData)
        .then(() => {
          this.props.fetchQuestionData({ product_id: this.props.product_id, page: 1,
            count: 100 });
          this.hideModal();
          alert ('Your answer has submitted');
        });
    } else {
      alert('email must be in xxx@yyy.com format');
    }

  }

  render() {

    return (
      <AlignRight>
        {this.state.show === true && <AnswerModal
          product_name={this.props.product_name}
          question={this.props.question}
          handleClose={this.hideModal}
          answerBody={this.answerBody}
          nickName={this.nickNameOnChange}
          email={this.emailOnChange}
          submitAnswerForm={this.submitAnswerForm}
        />}
        <AddLink onClick={this.showModal}>Add Answer</AddLink>
      </AlignRight>
    );
  }
}

const AlignRight = styled.span`
  font-weight: normal;
  float: right;
  font-size: smaller;
`;

const AddLink = styled.span`
  cursor: pointer;
`;

export default AddAnswer;
