import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';

import {Cell} from '../../index';

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
