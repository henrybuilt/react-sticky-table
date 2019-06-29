import React, { Component } from 'react';

import { StickyTable, Row, Cell } from '../../src';

export default class Basic extends Component {
  render() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c}>{(r === 0 ? 'Header ' : 'Cell ') + c}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    return (
      <div>
        <div style={{width: '100%', height: '200px'}}>
          <StickyTable>
            {rows}
          </StickyTable>
        </div>
      </div>
    );
  }
}
