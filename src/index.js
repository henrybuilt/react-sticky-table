import React, { Component, PropTypes } from 'react';

var proxy = require('nodeproxy');
var elementResizeEvent = require('element-resize-event');

import Table from './Table';
import Row from './Row';
import Cell from './Cell';

/**
 * StickyTable Component
 * Responsive, dynamically sized fixed headers and columns for tables
 * ------------------------------------------------------------------
 * Intentionally not setting state because we don't want to require
 * a full re-render every time the user scrolls or changes the
 * width of a cell.
 */
class StickyTable extends Component {
  constructor(props) {
    super(props);

    this.rowCount = 0;
    this.columnCount = 0;

    this.onResize = this.onResize.bind(this);
    this.onColumnResize = this.onColumnResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    if (document.getElementById('sticky-table-x-wrapper')) {
      document.getElementById('sticky-table-x-wrapper').addEventListener('scroll', this.onScroll);
    }
    if (document.getElementById('sticky-table')) {
      document.getElementById('sticky-table').addEventListener('scroll', this.onScroll);
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

  onScroll() {
    var scrollLeft = document.getElementById('sticky-table-x-wrapper').scrollLeft;
    var scrollTop = document.getElementById('sticky-table').scrollTop;
    console.log(scrollLeft, scrollTop);
    document.getElementById('sticky-header').style.left = (-1 * scrollLeft) + 'px';
    document.getElementById('sticky-header').style.top = scrollTop + 'px';
    //document.getElementById('sticky-header').style.transform = 'translate(' + (-1 * scrollLeft) + ', ' + scrollTop + 'px)';
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

    for (r = 0; r < this.rowCount; r++) {
      //rowToCopy = document.getElementById('row-' + r);
      rowToCopy = document.getElementById('sticky-table-x-wrapper').firstChild.firstChild.childNodes[r];

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

    for (c = 0; c < this.columnCount; c++) {
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

    rows.forEach(proxy((row, r) => {
      cells = row.props.children;

      stickyRows.push(
        <Row {...row.props} id='' key={r}>
          <Cell id={'sticky-column-first-cell-' + r}/>
          {cells[0]}
        </Row>
      );
    }, this));

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

    row.props.children.forEach((cell, c) => {
      cells.push(React.cloneElement(cell, {id: 'sticky-header-cell-' + c, style: {}}));
    });

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

    this.rowCount = rows.length;
    this.columnCount = rows[0].props.children.length;

    if (rows.length) {
      stickyColumn = this.getStickyColumn(rows);
      stickyHeader = this.getStickyHeader(rows);
    }

    return (
      <div className={'sticky-table ' + (this.props.className || '')} id='sticky-table'>
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
