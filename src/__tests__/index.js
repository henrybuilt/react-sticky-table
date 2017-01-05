import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';

import {StickyTable, Row, Cell} from '../index';

describe('StickyTable', () => {
  it('should render the correct number of children', () => {
    const table = mount(
      <StickyTable>
        <Row>
          <Cell>{'header 1'}</Cell>
          <Cell>{'header 2'}</Cell>
        </Row>
        <Row>
          <Cell>{'column 1 cell'}</Cell>
          <Cell>{'column 2 cell'}</Cell>
        </Row>
      </StickyTable>
    );

    expect(table.find('.cell')).to.have.length(9);
  });

  it('shouldn\'t render columns when opting out', () => {
    const table = mount(
      <StickyTable stickyColumnCount={0}>
        <Row>
          <Cell>{'header 1'}</Cell>
          <Cell>{'header 2'}</Cell>
        </Row>
        <Row>
          <Cell>{'column 1 cell'}</Cell>
          <Cell>{'column 2 cell'}</Cell>
        </Row>
      </StickyTable>
    );

    expect(table.find('.cell')).to.have.length(6);
    expect(table.find('#sticky-column .cell')).to.have.length(0);
  });

  it('shouldn\'t render headers when opting out', () => {
    const table = mount(
      <StickyTable stickyHeaderCount={0}>
        <Row>
          <Cell>{'header 1'}</Cell>
          <Cell>{'header 2'}</Cell>
        </Row>
        <Row>
          <Cell>{'column 1 cell'}</Cell>
          <Cell>{'column 2 cell'}</Cell>
        </Row>
      </StickyTable>
    );

    expect(table.find('.cell')).to.have.length(7);
    expect(table.find('#sticky-header .cell')).to.have.length(0);
  });
});
