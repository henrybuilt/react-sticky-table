import React from 'react';

import {mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import {Row, Cell} from '../../index';

configure({ adapter: new Adapter() });

describe('Row', () => {
  it('should render children properly', () => {
    const row = mount(
      <Row>
        <Cell>{'header 1'}</Cell>
        <Cell>{'header 2'}</Cell>
      </Row>
    );

    expect(row.find('.sticky-table-cell')).to.have.length(2);
  });
});
