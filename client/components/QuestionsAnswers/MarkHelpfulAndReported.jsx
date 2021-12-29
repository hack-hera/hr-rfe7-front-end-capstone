import React from 'react';
import styled from 'styled-components';
import api from '../../api.js';
import ls from 'local-storage';

const MarkHelpful = ({answer}) => {
  let alreadyMarked = (ls.get('markedAnswers') || []).includes(answer.id);
  let MarkAnswerHelpful = () => {
    let markedAnswers = ls.get('markedAnswers') || [];
    ls.set('markedAnswers', [...markedAnswers, answer.id]);
    api.markAnswerAsHelpful({answer_id: answer.id});
  };




  return (
    <div>
      {alreadyMarked === true && <>✓ Helpful</>}
      {(alreadyMarked === false) && <span>Helpful?{answer.helpfuless} <u onClick={MarkAnswerHelpful}>Yes</u>({answer.helpfulness})&emsp;|&emsp;</span>}
    </div>
  );
};

// markAnswerAsHelpful: function (params = {}) {
//   const { answer_id } = params;
//   if (!answer_id) { return Promise.reject(new Error('params must contain {answer_id}')); }
//   let url = `${host}/qa/answers/${answer_id}/helpful`;
//   return axios.put(url, {}, headers)
//     .then(res => Promise.resolve(res))
//     .catch(err => Promise.reject(new Error(err)));
// },

export default MarkHelpful;