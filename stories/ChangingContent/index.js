import React, { Component } from 'react';

import { StickyTable, Row, Cell } from '../../src';

import Button from '../Button';

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
    return (
      <div>
        <Button onClick={this.changeContent.bind(this)}>Change content</Button>
        <div style={{width: '100%', height: '200px'}}>
          <StickyTable stickyColumnCount={0}>
            {this.state.rows}
          </StickyTable>
        </div>
      </div>
    );
  }
}
