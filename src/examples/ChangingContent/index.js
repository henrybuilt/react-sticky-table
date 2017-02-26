import React, { Component } from 'react';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

import Button from '../../Button';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

export default class ChangingContent extends Component {
  constructor(props) {
    super(props);

    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c}>{(r === 0 ? 'Header ' : 'Cell ') + c}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    this.state = {
      rows: rows
    }
  }

  changeContent() {
    var rows = [];
    var cells;

    for (var r = 0; r < 50; r++) {
      cells = [];

      for (var c = 0; c < 20; c++) {
        cells.push(<Cell key={c}>{(r === 0 ? 'New Header ' : 'Cell ') + c}</Cell>);
      }

      rows.push(<Row key={r}>{cells}</Row>);
    }

    this.setState({rows});
  }

  render() {
    const codeString = '' +
      "import React, { Component } from 'react';\n" +
      "import { StickyTable, Row, Cell } from 'react-sticky-table';\n" +
      "import 'react-sticky-table/dist/react-sticky-table.css';\n\n" +

      'export default class ChangingContent extends Component {\n' +
      '  constructor(props) {\n'+
      '    super(props);\n'+
      '    var rows = [];\n'+
      '    this.state = {rows};\n'+
      '  }\n'+
      '  \n'+
      '  changeContent() {\n'+
      '    var rows = [<Row />];\n'+
      '    this.setState({rows});\n'+
      '  }\n'+
      '  \n' +
      '  render() {\n' +
      '    return (\n' +
      "      <div style={{width: '100%', height: '200px'}}>\n" +
      '        <StickyTable stickyColumnCount={0}>\n' +
      '          {this.state.rows}\n'+
      '        </StickyTable>\n' +
      '      </div>\n' +
      '    );\n' +
      '  }\n' +
      '}\n';

    return (
      <div>
        <Button onClick={this.changeContent.bind(this)}>Change content</Button>
        <div style={{width: '100%', height: '200px'}}>
          <StickyTable stickyColumnCount={0}>
            {this.state.rows}
          </StickyTable>
        </div>
        <div className="code-sample">
          <SyntaxHighlighter language='javascript' style={atomOneDark}>{codeString}</SyntaxHighlighter>
        </div>
      </div>
    );
  }
}
