import React from 'react';
import { QuestionModal } from './ModalForm.jsx';
import { Button } from '../Shared/Form';


class AddQuestion extends React.Component {
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
      <div>
        {this.state.show && <QuestionModal
          product_name={this.props.product_name}
          handleClose={this.hideModal}
        />}
        <Button onClick={this.showModal}>ADD A QUESTION +</Button>
      </div>
    );
  }
}

export default AddQuestion;