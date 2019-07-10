import React from 'react';

import {mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import {Cell} from '../../index';

configure({ adapter: new Adapter() });

describe('Cell', () => {
  it('should render children properly', () => {
    const cell = mount(
      <Cell>
        <span></span>
        <span></span>
      </Cell>
    );

    expect(cell.find('.sticky-table-cell span')).to.have.length(2);
  });
});
