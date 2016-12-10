# Sticky Table

Responsive and dynamically-sized fixed headers and columns for tables.

Inspired by [fixed-data-table](https://facebook.github.io/fixed-data-table/example-object-data.html)'s lack of responsiveness.

[Demo](https://we-flow.github.io/react-sticky-table/)

### Features

- Optional fixed columns & headers
- Responsive table dimensions (wrap it in any size container and it will fill that container)
- Dynamic row height & column width (no need to specify width and height in pixels)
- Rows and columns resize as content resizes
- Custom cells (just make sure your custom cell has `display: table-cell` set)
- Supports `overflow: scroll` on both axes
- Multiple tables per page

Doesn't yet support: Multiple columns/headers, Client side sorting, or IE <= 7.

### Getting Started

Install fixed-data-table using npm.

`npm install react-sticky-table --save`

Add the default stylesheet `react-sticky-table/dist/react-sticky-table.css`, then import it into any module.

### Example
```
import React, { Component } from 'react';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

export default class BasicExample extends Component {
  render() {
    return (
      <div>
        <div style={{width: '100%', height: '400px'}}>
          <StickyTable>
            <Row>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
            </Row>
            <Row>
              <Cell>Cell 1</Cell>
              <Cell>Cell 2</Cell>
            </Row>
          </StickyTable>
        </div>
      </div>
    );
  }
}
```
