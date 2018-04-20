import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Home from '../Home.jsx';

/* global describe, it, expect */
describe('Home', () => {
  it('must be contain good text', () => {
    const home = shallow(<Home />);
    expect(home.text()).toEqual('Welcome on Home');
  });

  it('must always be the same', () => {
    const snapshot = renderer.create(<Home />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
