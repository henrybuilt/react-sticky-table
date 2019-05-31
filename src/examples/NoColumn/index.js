import React, { Component } from 'react';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

export default class NoHeader extends Component {
  render() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c}>{(r < 1 ? 'Header ' : 'Cell ') + c}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    const codeString = '' +
      "import React, { Component } from 'react';\n" +
      "import { StickyTable, Row, Cell } from 'react-sticky-table';\n" +
      "import 'react-sticky-table/dist/react-sticky-table.css';\n\n" +

      'export default class ChangingContent extends Component {\n' +
      '  constructor(props) {\n'+
      '    super(props);\n'+
      '\n'+
      '    var rows = [];\n'+
      '    for (var i=0; i<10; i++) {\n'+
      '      rows.push((<Row><Cell>a {i}</Cell><Cell>b {i}</Cell></Row>));\n'+
      '    }\n'+
      '\n'+
      '    this.state = {rows};\n'+
      '  }\n'+
      '  \n'+
      '  render() {\n' +
      '    return (\n' +
      "      <div style={{width: '100%', height: '200px'}}>\n" +
      '        <StickyTable stickyColumnCount={0} stickyHeaderCount={1}>\n' +
      '          {this.state.rows}\n'+
      '        </StickyTable>\n' +
      '      </div>\n' +
      '    );\n' +
      '  }\n' +
      '}\n';

    return (
      <div>
        <div style={{width: '100%', height: '200px'}}>
          <StickyTable stickyColumnCount={0} stickyHeaderCount={1}>
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
