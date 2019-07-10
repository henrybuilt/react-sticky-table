import React from 'react';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';

import {StickyTable, Row, Cell} from '../index';

configure({ adapter: new Adapter() });

describe('StickyTable', () => {
  it('should render the correct number of children', () => {
    const table = mount(
      <StickyTable stickyColumnCount={1}>
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

    expect(table.find('.sticky-table-cell')).to.have.length(4);
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

    expect(table.find('.sticky-table-cell')).to.have.length(4);
  });

  it('should render the correct number of stickyColumnCount', () => {
    const table = mount(
      <StickyTable stickyColumnCount={3}>
        <Row>
          <Cell>{'header 1'}</Cell>
          <Cell>{'header 2'}</Cell>
          <Cell>{'header 3'}</Cell>
          <Cell>{'header 4'}</Cell>
        </Row>
        <Row>
          <Cell>{'column 1 cell'}</Cell>
          <Cell>{'column 2 cell'}</Cell>
          <Cell>{'column 3 cell'}</Cell>
          <Cell>{'column 4 cell'}</Cell>
        </Row>
      </StickyTable>
    );

    expect(table.find('.sticky-table-cell')).to.have.length(8);
  });

  it('shouldn\'t render headers when opting out', () => {
    const table = mount(
      <StickyTable stickyColumnCount={1} stickyHeaderCount={0}>
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

    expect(table.find('.sticky-table-cell')).to.have.length(4);
  });

  it('should support sibling components and arrays', () => {
    const table = mount(
      <StickyTable stickyColumnCount={1}>
        <Row>
          <Cell>{'header 1'}</Cell>
          {[<Cell key={1}>{'header 2'}</Cell>]}
        </Row>
      </StickyTable>
    );

    expect(table.find('.sticky-table-cell')).to.have.length(2);
  });
});
