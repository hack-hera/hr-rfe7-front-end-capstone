import React from 'react';
import styled from 'styled-components';
import Modal from '../Shared/Modal';

const AddReview = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <h1>Add a Review</h1>
    </Modal>
  );
};


export default AddReview;