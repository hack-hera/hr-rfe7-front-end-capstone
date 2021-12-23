import React from 'react';
import renderer from 'react-test-renderer';
import { Stars } from '../../client/components/Shared/Stars.jsx';


describe('Testing Star Component', () => {

  it('should have the correct number of stars in the output', () => {
    const component = renderer.create(<Stars number={3.6} />);
    let tree = component.toJSON();
    expect(tree.children.length).toEqual(5);
    //3.6 should render a half star
    expect(tree.children[3].props['data-icon']).toEqual('star-half-alt');
  });

  it('It should round to the nearest half number of stars', () => {
    const component = renderer.create(<Stars number={3.8} />);
    let tree = component.toJSON();
    expect(tree.children.length).toEqual(5);
    //3.8 should render a full star
    expect(tree.children[3].props['data-icon']).toEqual('star');
  });

  it('should should render 0 stars if you pass a number <0', () => {
    const component = renderer.create(<Stars number={-100} />);
    let tree = component.toJSON();
    expect(tree.children.length).toEqual(5);
    //expect the first star to be an empty icon
    expect(tree.children[0].props['data-prefix']).toEqual('far');
  });

  it('should should render 5 stars if you pass a number ', () => {
    const component = renderer.create(<Stars number={100} />);
    let tree = component.toJSON();
    expect(tree.children.length).toEqual(5);
    //expect the last star to be a full icon
    expect(tree.children[4].props['data-prefix']).toEqual('fas');
  });

});