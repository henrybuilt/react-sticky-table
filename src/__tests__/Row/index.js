import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';

import {Row, Cell} from '../../index';

describe('Row', () => {
  it('should render children properly', () => {
    const row = mount(
      <Row>
        <Cell>{'header 1'}</Cell>
        <Cell>{'header 2'}</Cell>
      </Row>
    );

    expect(row.find('.cell')).to.have.length(2);
  });
});
