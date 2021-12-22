import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/components/App.jsx';



test('App Component Should contain 5 H1s', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree.children.length).toEqual(5);

});