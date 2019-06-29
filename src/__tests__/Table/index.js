import React from 'react';

import {mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import {Table, Row, Cell} from '../../index';

configure({ adapter: new Adapter() });

describe('Table', () => {
  it('should render children properly', () => {
    const table = mount(
      <Table>
        <Row>
          <Cell>{'header 1'}</Cell>
          <Cell>{'header 2'}</Cell>
        </Row>
      </Table>
    );

    expect(table.find('.sticky-table-row')).to.have.length(1);
    expect(table.find('.sticky-table-cell')).to.have.length(2);
  });
});
