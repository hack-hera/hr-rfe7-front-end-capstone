import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const ClickHandler = ({ children }) => {
  let log = (e) => {
    let element = e.target;
    console.log(element);
  };
  return <div onClick={(e) => log(e)}>{children}</div>;
};

ReactDOM.render(
  <ClickHandler>
    <App />
  </ClickHandler>,
  document.getElementById('root')
);
