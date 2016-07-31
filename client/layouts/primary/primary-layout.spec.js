import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PrimaryLayout from './primary-layout';
import HeaderView from '../../views/header/header-view';
import FooterView from '../../views/footer/footer-view';


describe('PrimaryLayout', () => {
  it('should render component', () => {
    const component = shallow(<PrimaryLayout />);
    expect(component.contains(<HeaderView />)).to.be.true;
    expect(component.contains(<FooterView />)).to.be.true;
  });
});
