import React, { Component } from 'react';

import { StickyTable, Row, Cell } from '../../src';

export default class StickyAllSides extends Component {
  render() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        var title = 'Cell ';

        if (r === 0) title = 'Header ';
        if (r === 50 - 1) title = 'Footer ';

        cells.push(<Cell key={c}>{title + c}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    return (
      <div>
        <div style={{width: '100%', height: '200px'}}>
          <StickyTable leftStickyColumnCount={1} rightStickyColumnCount={1} stickyHeaderCount={1} stickyFooterCount={1}>
            {rows}
          </StickyTable>
        </div>
      </div>
    );
  }
}
