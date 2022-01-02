import React from 'react';
import styled from 'styled-components';
import { AnswerModal } from './ModalForm.jsx';


class AddAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <AlignRight>
        {this.state.show === true && <AnswerModal
          product_name={this.props.product_name}
          question={this.props.question}
          handleClose={this.hideModal}
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
