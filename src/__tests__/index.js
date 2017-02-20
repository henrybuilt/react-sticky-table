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

    expect(table.find('.cell')).to.have.length(9); //4 body, 2 header, 2 column, 1 corner
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

    expect(table.find('.cell')).to.have.length(6); //4 body, 2 header
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

    expect(table.find('.cell')).to.have.length(6); //4 body, 2 column
    expect(table.find('#sticky-header .cell')).to.have.length(0);
  });

  it('should support sibling components and arrays', () => {
    const table = mount(
      <StickyTable>
        <Row>
          <Cell>{'header 1'}</Cell>
          {[<Cell key={1}>{'header 2'}</Cell>]}
        </Row>
      </StickyTable>
    );

    expect(table.find('.cell')).to.have.length(6); //2 body, 2 header, 2 column
  });
});
