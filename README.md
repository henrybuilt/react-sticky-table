# React Sticky Table

Responsive and dynamically-sized fixed headers, footers, and columns for tables.

SEEKING EXAMPLE LINKS - please comment in [this issue](https://github.com/henrybuilt/react-sticky-table/issues/94) with your applications using react-sticky-table

[Demo](https://henrybuilt.github.io/react-sticky-table/)

## Features

- 0 dependencies, no css import necessary, no js, highly performant.
- 0, 1, or AS MANY sticky headers, left columns, right columns, footers as you want.
- Responsive table dimensions (wrap it in any size container and it will fill that container)
- Dynamic row height & column width (no need to specify fixed width/height in pixels)
- Table rows/columns resize as content resizes
- Custom cells (just make sure your custom cell has `display: table-cell` and the css selector `.sticky-table-cell`)
- Multiple tables per page
- Scrollbars that are smooth and visible at all times
- Native scrolling

### Top todos

- Use VirtualDom implementation
- Support IE <= 11

## Getting Started

```
npm install react-sticky-table --save
```

## Example
```javascript
import React, {Component} from 'react';
import {StickyTable, Row, Cell} from 'react-sticky-table';

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

## Props

- sticky count
  - `stickyHeaderCount`: `int` - default: `1`
  - `leftStickyColumnCount`: `int` - default: `1`
  - `rightStickyColumnCount`: `int` - default: `0`
  - `stickyFooterCount`: `int` - default: `0`
- z-index
  - `headerZ`: `int` - default: `2` (sticky corners are the greater of their two sides + 1)
  - `leftColumnZ`: `int` - default: `2`
  - `rightColumnZ`: `int` - default: `2`
  - `footerZ`: `int` - default: `2`
- border
  - `borderWidth`: default: `'2px'`
  - `borderColor`: default: `'#e5e5e5'`
- `wrapperRef`: default: `undefined`, value: `React ref` - a reference you can use for the wrapper element that has scroll events on it

Disable sticky header:

```javascript
<StickyTable stickyHeaderCount={0}>
```

Disable sticky column:

```javascript
<StickyTable leftStickyColumnCount={0}>
```

Disable borders:

```javascript
<StickyTable borderWidth={0}>
```

## License

(The MIT License)

Copyright (c) 2017 Henrybuilt.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
