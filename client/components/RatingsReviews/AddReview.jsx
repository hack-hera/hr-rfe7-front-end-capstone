import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from '../Shared/Modal';
import { Input, Dropdown, Button } from '../Shared/Form';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  submitForm() {
    //clear form
    console.log('submitting form!');
    this.setState({ submitted: true });
    setTimeout(this.props.onClose, 1000);
  }

  render() {
    const { onClose } = this.props;
    return (
      <Modal onClose={onClose} size={80}>
        {this.state.submitted ? (
          <h1>Thanks</h1>
        ) : (
          <div>
            <h1>Add a Review</h1>
            <Button onClick={() => this.submitForm()}>Finish Review</Button>
          </div>
        )}
      </Modal>
    );
  }
}

export default AddReview;
