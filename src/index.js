import React, { Component, PropTypes } from 'react';

var proxy = require('nodeproxy');
var elementResizeEvent = require('element-resize-event');

import Table from './Table';
import Row from './Row';
import Cell from './Cell';

class StickyTable extends Component {
  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
    this.onColumnResize = this.onColumnResize.bind(this);
    this.onScrollX = this.onScrollX.bind(this);
  }

  componentDidMount() {
    if (document.getElementById('sticky-table-x-wrapper')) {
      document.getElementById('sticky-table-x-wrapper').addEventListener('scroll', this.onScrollX);
    }

    if (document.getElementById('sticky-column')) {
      elementResizeEvent(document.getElementById('sticky-column'), this.onColumnResize);
    }

    if (document.getElementById('sticky-table-x-wrapper')) {
      elementResizeEvent(document.getElementById('sticky-table-x-wrapper').firstChild, this.onResize);
    }
  }

  componentWillUnmount() {
    if (document.getElementById('sticky-table-x-wrapper')) {
      document.getElementById('sticky-table-x-wrapper').removeEventListener('scroll', this.handleScrollX);
    }
  }

  onScrollX() {
    var scrollLeft;

    if (document.getElementById('sticky-table-x-wrapper')) {
      scrollLeft = document.getElementById('sticky-table-x-wrapper').scrollLeft;

      if (document.getElementById('sticky-header')) {
        document.getElementById('sticky-header').style.transform = 'translate(' + (-1 * scrollLeft) + 'px, 0)';
      }
    }
  }

  /**
   * Handle real cell resize events
   * @returns {null} no return necessary
   */
  onResize() {
    this.setRowHeights();
    this.setColumnWidths();
  }

  /**
   * Handle sticky column resize events
   * @returns {null} no return necessary
   */
  onColumnResize() {
    var column = document.getElementById('sticky-column');
    var cell = document.getElementById('sticky-table-x-wrapper').firstChild.firstChild.firstChild;
    var computedStyle = getComputedStyle(cell);
    var width = parseInt(column.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), 10);

    if (cell) {
      cell.style.width = width + 'px';
      cell.style.minWidth = width + 'px';
      cell.style.backgroundColor = '#000';
    }

    this.onResize();
  }

  /**
   * Get the height of each row in the table
   * @returns {null} no return necessary
   */
  setRowHeights() {
    var r, rowToCopy, height;

    for (r = 0; r < this.props.rowCount; r++) {
      rowToCopy = document.getElementById('row-' + r);

      if (rowToCopy) {
        height = rowToCopy.clientHeight;

        document.getElementById('sticky-column-first-cell-' + r).style.height = height + 'px';
      }
    }
  }

  /**
   * Get the width of each column in the table
   * @returns {null} no return necessary
   */
  setColumnWidths() {
    var c, cellToCopy, computedStyle, width, cell;

    for (c = 0; c < this.props.columnCount; c++) {
      cellToCopy = document.getElementById('header-cell-' + c);

      if (cellToCopy) {
        computedStyle = getComputedStyle(cellToCopy);
        width = cellToCopy.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
        cell = document.getElementById('sticky-header-cell-' + c);

        cell.style.width = width + 'px';
        cell.style.minWidth = width + 'px';
      }
    }
  }

  /**
   * Get the jsx cells for sticky columns by copying
   * children elements
   * @param {array} rows provided child row elements
   * @returns {array} array of <Row> elements for sticky column
   */
  getStickyColumn(rows) {
    var cells;
    var stickyRows = [];

    if (rows.length === this.props.rowCount) {
      rows.forEach(proxy((row, r) => {
        cells = row.props.children;

        stickyRows.push(
          <Row {...row.props} id='' key={r}>
            <Cell id={'sticky-column-first-cell-' + r}/>
            {cells[0]}
          </Row>
        );
      }, this));
    }

    return stickyRows;
  }

  /**
   * Get the jsx header cells and row by copying
   * children elements
   * @param {array} rows provided child row elements
   * @returns {jsx} <Row> of <Cell> elements for sticky header
   */
  getStickyHeader(rows) {
    var row = rows[0];
    var cells = [];

    if (row.props.children.length === this.props.columnCount) {
      row.props.children.forEach((cell, c) => {
        cells.push(React.cloneElement(cell, {id: 'sticky-header-cell-' + c, style: {}}));
      });
    }

    return (
      <Row {...row.props} id='sticky-header-row'>
        {cells}
      </Row>);
  }

  /**
   * Get the column and header to render
   * @returns {null} no return necessary
   */
  render() {
    var rows = React.Children.toArray(this.props.children);
    var stickyColumn, stickyHeader;

    if (rows.length) {
      stickyColumn = this.getStickyColumn(rows);
      stickyHeader = this.getStickyHeader(rows);
    }

    return (
      <div className={'sticky-table ' + (this.props.className || '')}>
        <div className='sticky-header' id='sticky-header'>
          <Table>
            {stickyHeader}
          </Table>
        </div>
        <div className='sticky-table-y-wrapper'>
          <div className='sticky-column' id='sticky-column'>
            <Table>
              {stickyColumn}
            </Table>
          </div>
          <div className='sticky-table-x-wrapper' id='sticky-table-x-wrapper'>
            <Table>
              {rows}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

StickyTable.propTypes = {
  rowCount: PropTypes.number, //Including header
  columnCount: PropTypes.number
};

export {StickyTable, Table, Row, Cell};
