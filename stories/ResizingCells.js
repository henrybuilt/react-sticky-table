import React, { Component } from 'react';

import { StickyTable, Row, Cell } from '../src';

import './index.css';

export default class ResizingCells extends Component {
  onCellClick(event) {
    event.target.innerHTML = Math.floor(Math.random() * 1000000000) + '<br>' + Math.floor(Math.random() * 1000000000);
  }

  render() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c} onClick={this.onCellClick}>{'Click Me!'}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    return (
      <div className='resizing-cells'>
        <div style={{width: '100%', height: '200px'}}>
          <StickyTable>
            {rows}
          </StickyTable>
        </div>
        <div className="code-sample">
          <SyntaxHighlighter language='javascript' style={atomOneDark}>{codeString}</SyntaxHighlighter>
        </div>
      </div>
    );
  }
}
