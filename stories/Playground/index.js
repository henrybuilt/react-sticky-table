import React, { Component } from 'react';
import { StickyTable, Row, Cell } from '../../src';

export default class Playground extends Component {
  render() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c}>{(r === 0 ? `Header ${c}` : `Cell (${r}, ${c})`)}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }
    const { stickyHeaderCount, leftStickyColumnCount,
      rightStickyColumnCount, stickyFooterCount,
      height, width } = this.props;
    return (
      <div>
        <div style={{ width, height }}>
          <StickyTable
            stickyHeaderCount={stickyHeaderCount}
            leftStickyColumnCount={leftStickyColumnCount}
            rightStickyColumnCount={rightStickyColumnCount}
            stickyFooterCount={stickyFooterCount}
          >
            {rows}
          </StickyTable>
        </div>
      </div>
    );
  }
}
