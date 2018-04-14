import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
class StickyTable extends PureComponent {
  static propTypes = {
    stickyHeaderCount: PropTypes.number,
    stickyColumnCount: PropTypes.number,
    onScroll: PropTypes.func
  };

  static defaultProps = {
    stickyHeaderCount: 1,
    stickyColumnCount: 1
  };

  constructor(props) {
    super(props);

    this.rowCount = 0;
    this.columnCount = 0;
    this.xScrollSize = 0;
    this.yScrollSize = 0;

    this.dom = {};

    this.stickyHeaderCount = props.stickyHeaderCount === 0 ? 0 : (this.stickyHeaderCount || 1);

    this.isFirefox = navigator && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    ['onScrollX', 'onScrollBarX', 'onScrollBarY', 'scrollXScrollbar', 'scrollYScrollbar', 'considerResizing'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.dom.wrapper) {
      this.dom.bodyTable = this.dom.wrapper.querySelector('.sticky-table-x-wrapper .sticky-table-table');
      this.dom.xScrollbar = this.dom.wrapper.querySelector('.x-scrollbar');
      this.dom.yScrollbar = this.dom.wrapper.querySelector('.y-scrollbar');
      this.dom.xWrapper = this.dom.wrapper.querySelector('.sticky-table-x-wrapper');
      this.dom.yWrapper = this.dom.wrapper.querySelector('.sticky-table-y-wrapper');
      this.dom.stickyHeader = this.dom.wrapper.querySelector('.sticky-table-header');
      this.dom.stickyColumn = this.dom.wrapper.querySelector('.sticky-table-column');
      this.dom.stickyCorner = this.dom.wrapper.querySelector('.sticky-table-corner');
      this.dom.stickyHeaderTable = this.dom.stickyHeader.querySelector('.sticky-table-table');
      this.dom.stickyColumnTable = this.dom.stickyColumn.querySelector('.sticky-table-table');
      this.dom.stickyCornerTable = this.dom.stickyCorner.querySelector('.sticky-table-table');

      this.setScrollData();

      this.considerResizing();
      setTimeout(() => this.considerResizing());

      this.resizeInterval = setInterval(this.considerResizing, 60);

      //X Scrollbars
      this.dom.xWrapper.addEventListener('scroll', this.onScrollX);
      this.dom.xWrapper.addEventListener('scroll', this.scrollXScrollbar);
      this.dom.xScrollbar.addEventListener('scroll', this.onScrollBarX);

      //Y Scrollbars
      this.dom.yWrapper.addEventListener('scroll', this.scrollYScrollbar);
      this.dom.yScrollbar.addEventListener('scroll', this.onScrollBarY);
    }
  }

  /**
   * @returns {undefined}
   */
  componentDidUpdate() {
    this.considerResizing();
  }

  /**
   * @returns {undefined}
   */
  componentWillUnmount() {
    if (this.dom.wrapper) {
      this.dom.xWrapper.removeEventListener('scroll', this.onScrollX);
      this.dom.xWrapper.removeEventListener('scroll', this.scrollXScrollbar);
      this.dom.xScrollbar.removeEventListener('scroll', this.onScrollBarX);

      this.dom.yWrapper.removeEventListener('scroll', this.scrollYScrollbar);
      this.dom.yScrollbar.removeEventListener('scroll', this.onScrollBarY);

      clearInterval(this.resizeInterval);
    }
  }

  /**
   * Set scroll data on resize for handle scroll events
   * @returns {object} current scroll data object
   */
  setScrollData() {
    this.suppressScrollX = false;
    this.suppressScrollY = false;

    return this.scrollData = {
      scrollTop: this.dom.yScrollbar.scrollTop,
      scrollHeight: this.dom.yScrollbar.scrollHeight,
      clientHeight: this.dom.yScrollbar.clientHeight,
      scrollLeft: this.dom.xScrollbar.scrollLeft,
      scrollWidth: this.dom.xScrollbar.scrollWidth,
      clientWidth: this.dom.xScrollbar.clientWidth
    };
  }

  /**
   * Handle horizontal scroll wrapper X event
   * @returns {undefined}
   */
  onScrollBarX() {
    if (!this.suppressScrollX) {
      this.scrollData.scrollLeft = this.dom.xWrapper.scrollLeft = this.dom.xScrollbar.scrollLeft;
      this.suppressScrollX = true;
    } else {
      this.handleScroll();
      this.suppressScrollX = false;
    }
  }

  /**
   * Handle vertical scroll wrapper Y event
   * @returns {undefined}
   */
  onScrollBarY() {
    if (!this.suppressScrollY) {
      this.scrollData.scrollTop = this.dom.yWrapper.scrollTop = this.dom.yScrollbar.scrollTop;
      this.suppressScrollY = true;
    } else {
      this.handleScroll();
      this.suppressScrollY = false;
    }
  }

  /**
   * Handle horizontal scroll bar X event for header
   * @returns {undefined}
   */
  onScrollX() {
    var scrollLeft = Math.max(this.dom.xWrapper.scrollLeft, 0);
    this.dom.stickyHeaderTable.style.transform = 'translate(' + (-1 * scrollLeft) + 'px, 0) translateZ(0)';
  }

  /**
   * Handle horizontal scroll bar X event
   * @returns {undefined}
   */
  scrollXScrollbar() {
    if (!this.suppressScrollX) {
      this.scrollData.scrollLeft = this.dom.xScrollbar.scrollLeft = this.dom.xWrapper.scrollLeft;
      this.suppressScrollX = true;
    } else {
      this.handleScroll();
      this.suppressScrollX = false;
    }
  }

  /**
   * Handle vertical scroll bar Y event
   * @returns {undefined}
   */
  scrollYScrollbar() {
    if (!this.suppressScrollY) {
      this.scrollData.scrollTop = this.dom.yScrollbar.scrollTop = this.dom.yWrapper.scrollTop;
      this.suppressScrollY = true;
    } else {
      this.handleScroll();
      this.suppressScrollY = false;
    }
  }

  /**
   * Handle scroll events
   * @returns {undefined}
   */
  handleScroll() {
    if (this.props.onScroll) {
      this.props.onScroll(this.scrollData);
    }
  }

  /**
   * Handle real cell resize events
   * @returns {undefined}
   */
  considerResizing({forceCellTableResize=false, forceWrapperResize=false} = {}) {
    var wrapperSize = {
      width: this.dom.wrapper.offsetWidth,
      height: this.dom.wrapper.offsetWidth
    };

    var tableCellSizes = {
      corner: {width: this.dom.stickyCornerTable.offsetWidth, height: this.dom.stickyCornerTable.offsetHeight},
      header: {width: this.dom.stickyHeaderTable.offsetWidth, height: this.dom.stickyHeaderTable.offsetHeight},
      column: {width: this.dom.stickyColumnTable.offsetWidth, height: this.dom.stickyColumnTable.offsetHeight},
      body: {width: this.dom.bodyTable.offsetWidth, height: this.dom.bodyTable.offsetHeight}
    };

    var tableCellSizesChanged = JSON.stringify(tableCellSizes) !== JSON.stringify(this.oldTableCellSizes);
    var wrapperSizeChanged = JSON.stringify(wrapperSize) !== JSON.stringify(this.oldWrapperSize);

    if (forceCellTableResize || !this.oldTableCellSizes || tableCellSizesChanged) {
      this.setRowHeights();
      this.setColumnWidths();

      this.oldTableCellSizes = tableCellSizes;
    }

    if (forceWrapperResize || !this.oldWrapperSize || wrapperSizeChanged || tableCellSizesChanged) {
      this.setScrollBarDims();
      this.setScrollBarWrapperDims();
      this.setScrollData();
      this.handleScroll();

      this.dom.xWrapper.style.maxWidth = `calc(100% - ${this.dom.stickyColumn.offsetWidth}px`;
      this.dom.yWrapper.style.height = `calc(100% - ${this.dom.stickyHeader.offsetHeight}px`;

      this.oldWrapperSize = wrapperSize;
    }
  }

  /**
   * Set padding on scroll bars
   * @returns {undefined}
   */
  setScrollBarPaddings() {
    var scrollPadding = '0px 0px ' + this.xScrollSize + 'px 0px';
    this.dom.wrapper.style.padding = scrollPadding;

    var scrollPadding = '0px ' + this.yScrollSize + 'px 0px 0px';
    this.dom.xWrapper.firstChild.style.padding = scrollPadding;
  }

  /**
   * Set scroll bar wrappers size
   * @returns {undefined}
   */
  setScrollBarWrapperDims() {
    this.dom.yScrollbar.style.height = 'calc(100% - ' + this.dom.stickyHeader.offsetHeight + 'px)';
    this.dom.yScrollbar.style.top = this.dom.stickyHeader.offsetHeight + 'px';
  }

  /**
   * Set visible scroll bar elements size
   * @returns {undefined}
   */
  setScrollBarDims() {
    var width = this.getNodeSize(this.dom.bodyTable.firstChild).width + this.dom.stickyColumn.offsetWidth;
    this.dom.xScrollbar.firstChild.style.width = width + 'px';

    this.xScrollSize = this.dom.xScrollbar.offsetHeight - this.dom.xScrollbar.clientHeight;

    var height = this.dom.bodyTable.offsetHeight + this.dom.stickyHeader.offsetHeight;
    this.dom.yScrollbar.firstChild.style.height = height + 'px';

    this.yScrollSize = this.dom.yScrollbar.offsetWidth - this.dom.yScrollbar.clientWidth;

    if (!this.isFirefox) {
      this.setScrollBarPaddings();
    }

    if (this.xScrollSize) this.dom.xScrollbar.style.height = this.xScrollSize + 1 + 'px';
    if (this.yScrollSize)  this.dom.yScrollbar.style.width = this.yScrollSize + 1  + 'px';
  }

  /**
   * Get the height of each row in the table
   * @returns {undefined}
   */
  setRowHeights() {
    var bodyRows, stickyHeaderRows, stickyCornerRows, stickyColumnRows, cells, columnHeight, resizeRow, row;

    if (this.rowCount > 0 && this.props.stickyColumnCount > 0) {
      bodyRows = this.dom.bodyTable.childNodes;
      stickyColumnRows = this.dom.stickyColumnTable.childNodes;

      stickyCornerRows = this.dom.stickyCornerTable.childNodes;
      stickyHeaderRows = this.dom.stickyHeaderTable.childNodes;

      resizeRow = row => {
        cells = [];

        if (row < this.props.stickyHeaderCount) { //It's a sticky column
          cells[0] = stickyCornerRows[row].childNodes[0];
          cells[1] = stickyHeaderRows[row].childNodes[0];
        } else { //It's a body column
          cells[0] = stickyColumnRows[row - this.props.stickyHeaderCount].childNodes[0];
          cells[1] = bodyRows[row - this.props.stickyHeaderCount].childNodes[0];
        }

        cells.forEach(cell => cell.style.height = '');

        columnHeight = Math.max(this.getNodeSize(cells[0]).height, this.getNodeSize(cells[1]).height);

        cells.forEach(cell => cell.style.height = `${Math.round(columnHeight)}px`);
      };

      for (row = 0; row < this.rowCount; row++) {
        setTimeout(resizeRow(row));
      }
    }
  }

  /**
   * Get the width of each column in the table
   * @returns {undefined}
   */
  setColumnWidths() {
    var firstBodyRowCells, firstStickyHeaderRowCells, firstStickyCornerRowCells, firstStickyColumnRowCells,
      cells, resizeColumn, column;

    if (this.columnCount > 0 && this.props.stickyHeaderCount > 0) {
      firstBodyRowCells = this.dom.bodyTable.childNodes[0].childNodes;
      firstStickyHeaderRowCells = this.dom.stickyHeaderTable.childNodes[0].childNodes;

      firstStickyCornerRowCells = this.dom.stickyCornerTable.childNodes[0].childNodes;
      firstStickyColumnRowCells = this.dom.stickyColumnTable.childNodes[0].childNodes;

      resizeColumn = column => {
        cells = [];

        if (column < this.props.stickyColumnCount) { //It's a sticky column
          cells[0] = firstStickyColumnRowCells[column];
          cells[1] = firstStickyCornerRowCells[column];
        } else { //It's a body column
          cells[0] = firstBodyRowCells[column - this.props.stickyColumnCount];
          cells[1] = firstStickyHeaderRowCells[column - this.props.stickyColumnCount];
        }

        //IMPORTANT: minWidth is a necessary property here
        //because display: table-cell desparately wants to be dynamic/minimum in size
        cells.forEach(cell => cell.style.width = cell.style.minWidth = '');

        var columnWidth = Math.max(this.getNodeSize(cells[0]).width, this.getNodeSize(cells[1]).width);

        cells.forEach(cell => cell.style.width = cell.style.minWidth = `${columnWidth}px`);
      };

      for (column = 0; column < this.columnCount; column++) {
        setTimeout(resizeColumn(column));
      }
    }
  }

  /**
   * Get innerWidth and innerHeight of elements
   * @param  {object} node dom object
   * @return {object} dimensions
   */
  getNodeSize(node) {
    return node.getBoundingClientRect();
  }

  getStickyColumnRows(rows) {
    return this.getRowSubset(rows, (r => r >= this.props.stickyHeaderCount), (c => c < this.props.stickyColumnCount));
  }

  getStickyHeaderRows(rows) {
    return this.getRowSubset(rows, (r => r < this.props.stickyHeaderCount), (c => c >= this.props.stickyColumnCount));
  }

  getStickyCornerRows(rows) {
    return this.getRowSubset(rows, (r => r < this.props.stickyHeaderCount), (c => c < this.props.stickyColumnCount));
  }

  getBodyRows(rows) {
    return this.getRowSubset(rows, (r => r >= this.props.stickyHeaderCount), (c => c >= this.props.stickyColumnCount));
  }

  /**
   * Get the first n cells of the first m rows
   * @param {array} rows array of <Row> elements
   * @param {fn} includeRow return boolean indicating whether to include row or not
   * @param {fn} includeColumn return boolean indicating whether to include column or not
   * @returns {jsx} subset of row and cell elements
   */
  getRowSubset(rows, includeRow, includeColumn) {
    var stickyRows = [], cells, cellsSubset;

    rows.forEach((row, r) => {
      if (includeRow(r)) {
        cells = React.Children.toArray(row.props.children);
        cellsSubset = [];

        cells.forEach((cell, c) => {
          if (includeColumn(c)) {
            cellsSubset.push(cell);
          }
        });

        stickyRows.push(
          <Row {...row.props} id='' key={r}>
            {cellsSubset}
          </Row>
        );
      }
    });

    return stickyRows;
  }

  /**
   * Get the column and header to render
   * @returns {undefined}
   */
  render() {
    //This is probably sub-optimal because render only needs
    //to be called for react components that are sub-classed
    //and don't have props.children that are <Cell>s
    var rows = React.Children.toArray(this.props.children).map(row => {
      return new row.type(row.props).render(); // eslint-disable-line new-cap
    });

    var stickyCornerRows = this.getStickyCornerRows(rows);
    var stickyColumnRows = this.getStickyColumnRows(rows);
    var stickyHeaderRows = this.getStickyHeaderRows(rows);
    var bodyRows = this.getBodyRows(rows);

    this.rowCount = rows.length;
    this.columnCount = (rows[0] && React.Children.toArray(rows[0].props.children).length) || 0;

    var setWrapperElement = element => {
      if (element) this.dom.wrapper = element;
    }

    return (
      <div className={'sticky-table ' + (this.props.className || '')} ref={setWrapperElement}>
        <div className='x-scrollbar'><div></div></div>
        <div className='y-scrollbar'><div></div></div>
        <div className='sticky-table-header-wrapper'>
          <div className={['sticky-table-corner', (this.props.stickyHeaderCount && this.props.stickyColumnCount) ? '' : 'hidden'].join(' ')}>
            <Table>{stickyCornerRows}</Table>
          </div>
          <div className={['sticky-table-header', this.props.stickyHeaderCount ? '' : 'hidden'].join(' ')}>
            <Table>{stickyHeaderRows}</Table>
          </div>
        </div>
        <div className='sticky-table-y-wrapper'>
          <div className={['sticky-table-column', this.props.stickyColumnCount ? '' : 'hidden'].join(' ')}>
            <Table>{stickyColumnRows}</Table>
          </div>
          <div className='sticky-table-x-wrapper'>
            <Table>{bodyRows}</Table>
          </div>
        </div>
      </div>
    );
  }
}

export {StickyTable, Table, Row, Cell};
