# React Sticky Table

Responsive and dynamically-sized fixed headers and columns for tables inspired by [fixed-data-table](https://facebook.github.io/fixed-data-table/example-object-data.html)'s lack of responsiveness.

[Demo](https://henrybuilt.github.io/react-sticky-table/)

## Features

- 0 dependencies, pure css, highly performant.
- 0 or 1 fixed column & header
- Responsive table dimensions (wrap it in any size container and it will fill that container)
- Dynamic row height & column width (no need to specify width and height in pixels)
- Table rows/columns resize as content resizes
- Custom cells (just make sure your custom cell has `display: table-cell` and the css selector `.sticky-table-cell`)
- Multiple tables per page
- Scrollbars that are smooth and visible at all times
- Native scrolling

#### Doesn't yet support

- Any number of fixed columns & headers
- Client side sorting
- IE <= 7

## Getting Started

Install `react-sticky-table` using `npm`.

```
npm install react-sticky-table --save
```

Make sure you import the mandatory stylesheet: [react-sticky-table/dist/react-sticky-table.css](https://github.com/henrybuilt/react-sticky-table/blob/master/dist/react-sticky-table.css). It should be unobtrusive.

## Example
```javascript
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

## Options

- `stickyHeaderCount`: default: `1`, value: `0 or 1`
- `stickyColumnCount`: default: `1`, value: `0 or 1`

Disable sticky header:

```javascript
<StickyTable stickyHeaderCount={0}>
```

Disable sticky column:

```javascript
<StickyTable stickyColumnCount={0}>
```

## License

(The MIT License)

Copyright (c) 2017 Henrybuilt.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
