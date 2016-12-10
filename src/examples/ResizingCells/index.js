import React, { Component } from 'react';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

import './index.css';

export default class ResizingCells extends Component {
  onCellClick(event) {
    if (event.target.innerHTML.indexOf('Click Me!') !== -1) {
      event.target.innerHTML = Math.floor(Math.random() * 1000000000) + '<br>' + Math.floor(Math.random() * 1000000000);
    }
  }

  render() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c} onClick={this.onCellClick}>{(r === 0 || c === 0 ? '...' : 'Click Me!')}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    const codeString = '' +
      'export default class ResizingCellsExample extends Component {\n' +
      '  onCellClick(event) {\n' +
      "    if (event.target.innerHTML.indexOf('Click Me!') !== -1) {\n" +
      "      event.target.innerHTML = Math.floor(Math.random() * 1000000000) + '<br>' + Math.floor(Math.random() * 1000000000);\n" +
      '    }\n' +
      '  }\n' +
      '  \n' +
      '  render() {\n' +
      '    return (\n' +
      "      <div style={{width: '100%', height: '200px'}}>\n" +
      '        <StickyTable>\n' +
      '          <Row>\n' +
      '            <Cell>...</Cell>\n' +
      '            //Other header cells...\n' +
      '          </Row>\n' +
      '          <Row>\n' +
      '            <Cell>...</Cell>\n' +
      '            <Cell onClick={this.onCellClick}>Click Me!</Cell>\n' +
      '          </Row>\n' +
      '        </StickyTable>\n' +
      '      </div>\n' +
      '    );\n' +
      '  }\n' +
      '}\n';

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
