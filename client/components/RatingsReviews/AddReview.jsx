import React, { useState } from 'react';
import styled from 'styled-components';
import { LoremIpsum } from 'lorem-ipsum';

import api from '../../api';
import { Modal } from '../Shared/Modal';
import { Input, Dropdown, Button, Textarea } from '../Shared/Form';
import { Stars, StarForm } from '../Shared/Stars';
import {
  RecommendForm,
  CharacteristicsForm,
  AddImages,
} from './FormComponents';
import { validateReviewForm } from '../../lib/formValidation';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

const AddReview = ({ onClose, meta, product, onSubmit }) => {
  let [submitted, setSubmitted] = useState(false);
  let [fading, setFading] = useState(false);
  let [formData, setFormData] = useState({
    product_id: product.id,
    rating: 3,
    recommend: false,
    characteristics: { 125031: 3, 125032: 4 },
    email: 'asieke@gmail.com',
    name: 'siekechu',
    summary: lorem.generateSentences(1),
    body: lorem.generateSentences(8),
    photos: [
      'https://cdn.pixabay.com/photo/2020/12/01/10/04/dog-5793625__480.jpg',
      'https://cdn.pixabay.com/photo/2021/12/09/20/58/christmas-cookies-6859116__340.jpg',
    ],
  });

  let [errors, setErrors] = useState({});

  let submitForm = () => {
    //clear form
    let currentErrors = validateReviewForm(formData);

    if (Object.keys(currentErrors).length === 0) {
      api
        .addReview(formData)
        .then(() => {
          console.log('submitted it to the API');
          setSubmitted(true);
          setTimeout(() => setFading(true), 1000);
          setTimeout(() => onSubmit(formData), 1200);
        })
        .catch((err) => {
          setErrors({
            ...currentErrors,
            global:
              'There was an error submitting your review, please try again',
          });
        });
    } else {
      setErrors(currentErrors);
    }
  };

  const { summary = '', body = '', name = '', email = '' } = formData;

  return (
    <Container fade={fading}>
      <Modal onClose={onClose} width={60} height={90}>
        {submitted ? (
          <Submitted>
            Thanks for your review! You are an awesome customer 😀
          </Submitted>
        ) : (
          <Form>
            <Header>Add a Review for {product.name}</Header>
            <Label>
              <Error>{errors.global || ''}</Error>
            </Label>
            <Label>
              Overall Rating
              <Error>{errors.rating || ''}</Error>
            </Label>
            <Field>
              <StarForm
                number={formData.rating}
                onClick={(n) => {
                  setFormData({ ...formData, rating: n });
                  setErrors({ ...errors, rating: '' });
                }}
              />
            </Field>

            <Label>
              Do you recommend this product
              <Error>{errors.recommend || ''}</Error>
            </Label>

            <Field>
              <RecommendForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            </Field>
            <Label>
              How would you rate the characteristics of this product?
              <Error>{errors.characteristics || ''}</Error>
            </Label>

            <Field>
              <CharacteristicsForm
                meta={meta}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            </Field>
            <Label>
              Summary{' '}
              {summary.length < 20 && (
                <>{20 - summary.length} characters needed</>
              )}
              {summary.length >= 20 && summary.length < 60 && (
                <>{60 - summary.length} characters remaining</>
              )}
              <Error>{errors.summary || ''}</Error>
            </Label>

            <Input
              value={formData.summary}
              maxLength={60}
              style={{ width: '50%' }}
              onFocus={() => setErrors({ ...errors, summary: '' })}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />

            <Label>
              Review:{' '}
              {body.length < 50 && <>{50 - body.length} characters needed</>}
              {body.length >= 50 && body.length < 1000 && (
                <>{1000 - body.length} characters remaining</>
              )}
              <Error>{errors.body || ''}</Error>
            </Label>
            <Textarea
              rows={5}
              cols={50}
              onFocus={() => setErrors({ ...errors, body: '' })}
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
            />
            <Label>Add Images</Label>
            <AddImages formData={formData} setFormData={setFormData} />

            <Label>
              What is your nickname (mandatory)
              <Error>{errors.name || ''}</Error>
            </Label>
            <Input
              value={formData.name}
              maxLength={60}
              style={{ width: '50%' }}
              onFocus={() => setErrors({ ...errors, name: '' })}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Note>
              For privacy reasons, do not use your full name or email address
            </Note>
            <Label>
              Your email (mandatory)
              <Error>{errors.email || ''}</Error>
            </Label>
            <Input
              value={formData.email}
              maxLength={60}
              style={{ width: '50%' }}
              onFocus={() => setErrors({ ...errors, email: '' })}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Note>For authentication reasons, you will not be emailed</Note>

            <Field>
              <Button
                style={{ marginTop: '10px' }}
                onClick={() => submitForm()}
              >
                Add Review!
              </Button>
            </Field>
          </Form>
        )}
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  ${(props) =>
    props.fade === true
      ? 'visibility: hidden; opacity: 0; transition: visibility 0s 200ms, opacity 200ms linear;'
      : ''}
`;

const Submitted = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Form = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-left: 5px;
  background-color: ${(props) => props.theme.bgLight};
`;

const Header = styled.div`
  width: 100%;
`;

const Label = styled.div`
  margin: 10px 0px 5px 0px;
  font-size: 0.7em;
  color: ${(props) => props.theme.textLight};
`;

const Error = styled.span`
  color: ${(props) => props.theme.error};
  margin-left: 10px;
`;

const Note = styled.div`
  margin: -5px 0px 0px 0px;
  padding: 0px;
  font-size: 0.5em;
  color: ${(props) => props.theme.textLight};
`;

const Field = styled.div`
  font-size: 0.7em;
  color: ${(props) => props.theme.textLight};
  table {
    width: 70%;
    font-size: 0.8em;
    border-collapse: collapse;
  }
  td {
    width: 18%;
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
  }
  td.selected {
    background-color: ${(props) => props.theme.highlight};
  }
  td:hover {
    background-color: ${(props) => props.theme.highlight};
    cursor: pointer;
  }
  th {
    text-align: left;
    width: 10%;
  }
`;

export default AddReview;
