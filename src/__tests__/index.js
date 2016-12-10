import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import StickyTable from '../index';
import Row from '../Row';
import Cell from '../Cell';

describe('StickyTable', () => {
  it('should render the children properly', () => {
    const table = mount(
      <StickyTable rowCount={2} columnCount={2}>
        <Row>
          <Cell>'header 1'</Cell>
          <Cell>'header 2'</Cell>
        </Row>
        <Row>
          <Cell>'column 1 cell'</Cell>
          <Cell>'column 2 cell'</Cell>
        </Row>
      </StickyTable>
    );

    expect(table.find('.cell')).to.have.length(4);
  });
});
