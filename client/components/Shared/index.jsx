import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import { THEMES } from '../../settings/colors';
import { Stars, StarForm } from './Stars';

const Components = () => {
  return (
    <ThemeProvider theme={THEMES.default}>
      <Section>
        <pre>Star Rating</pre>
        <Stars number={3.56} size={20} />
      </Section>
      <Section>
        <pre>Star Form</pre>
        <StarForm number={3.56} size={120} onClick={(e) => alert(e)} />
      </Section>
    </ThemeProvider>
  );
};

const Section = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
`;

ReactDOM.render(<Components />, document.getElementById('root'));
