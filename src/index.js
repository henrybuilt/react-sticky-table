import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

    this.id = Math.floor(Math.random() * 1000000000) + '';

    this.rowCount = 0;
    this.columnCount = 0;
    this.xScrollSize = 0;
    this.yScrollSize = 0;

    this.stickyHeaderCount = props.stickyHeaderCount === 0 ? 0 : (this.stickyHeaderCount || 1);

    this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  componentDidMount() {
    this.table = document.getElementById('sticky-table-' + this.id);

    if (this.table) {
      this.realTable = this.table.querySelector('#sticky-table-x-wrapper').firstChild;
      this.xScrollbar = this.table.querySelector('#x-scrollbar');
      this.yScrollbar = this.table.querySelector('#y-scrollbar');
      this.xWrapper = this.table.querySelector('#sticky-table-x-wrapper');
      this.yWrapper = this.table.querySelector('#sticky-table-y-wrapper');
      this.stickyHeader = this.table.querySelector('#sticky-table-header');
      this.stickyColumn = this.table.querySelector('#sticky-table-column');
      this.stickyCorner = this.table.querySelector('#sticky-table-corner');
      this.setScrollData();

      this.onResize();
      setTimeout(this.onResize);
      this.addScrollBarEventHandlers();
    }
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentWillUnmount() {
    if (this.table) {
      this.xWrapper.removeEventListener('scroll', this.onScrollX);
      this.xWrapper.removeEventListener('scroll', this.scrollXScrollbar);
      this.xScrollbar.removeEventListener('scroll', this.onScrollBarX);

      this.yWrapper.removeEventListener('scroll', this.scrollYScrollbar);
      this.yScrollbar.removeEventListener('scroll', this.onScrollBarY);

    }
  }

  /**
   * Link scrolling on either axis to scrolling in the scrollbar elements
   * @returns {null} no return necessary
   */
  addScrollBarEventHandlers() {
    this.xWrapper.addEventListener('scroll', this.onScrollX);

    //X Scrollbars
    this.xWrapper.addEventListener('scroll', this.scrollXScrollbar);
    this.xScrollbar.addEventListener('scroll', this.onScrollBarX);

    //Y Scrollbars
    this.yWrapper.addEventListener('scroll', this.scrollYScrollbar);
    this.yScrollbar.addEventListener('scroll', this.onScrollBarY);
  }

  /**
   * Set scroll data on resize for handle scroll events
   * @returns {object} current scroll data object
   */
  setScrollData = () => {
    this.suppressScrollX = false;
    this.suppressScrollY = false;

    return this.scrollData = {
      scrollTop: this.yScrollbar.scrollTop,
      scrollHeight: this.yScrollbar.scrollHeight,
      clientHeight: this.yScrollbar.clientHeight,
      scrollLeft: this.xScrollbar.scrollLeft,
      scrollWidth: this.xScrollbar.scrollWidth,
      clientWidth: this.xScrollbar.clientWidth
    };
  }

  /**
   * Handle horizontal scroll wrapper X event
   * @returns {null} no return necessary
   */
  onScrollBarX = () => {
    if (!this.suppressScrollX) {
      this.scrollData.scrollLeft = this.xWrapper.scrollLeft = this.xScrollbar.scrollLeft;
      this.suppressScrollX = true;
    } else {
      this.handleScroll();
      this.suppressScrollX = false;
    }
  }

  /**
   * Handle vertical scroll wrapper Y event
   * @returns {null} no return necessary
   */
  onScrollBarY = () => {
    if (!this.suppressScrollY) {
      this.scrollData.scrollTop = this.yWrapper.scrollTop = this.yScrollbar.scrollTop;
      this.suppressScrollY = true;
    } else {
      this.handleScroll();
      this.suppressScrollY = false;
    }
  }

  /**
   * Handle horizontal scroll bar X event for header
   * @returns {null} no return necessary
   */
  onScrollX = () => {
    var scrollLeft = Math.max(this.xWrapper.scrollLeft, 0);
    this.stickyHeader.style.transform = 'translate(' + (-1 * scrollLeft) + 'px, 0)';
  }

  /**
   * Handle horizontal scroll bar X event
   * @returns {null} no return necessary
   */
  scrollXScrollbar = () => {
    if (!this.suppressScrollX) {
      this.scrollData.scrollLeft = this.xScrollbar.scrollLeft = this.xWrapper.scrollLeft;
      this.suppressScrollX = true;
    } else {
      this.handleScroll();
      this.suppressScrollX = false;
    }
  }

  /**
   * Handle vertical scroll bar Y event
   * @returns {null} no return necessary
   */
  scrollYScrollbar = () => {
    if (!this.suppressScrollY) {
      this.scrollData.scrollTop = this.yScrollbar.scrollTop = this.yWrapper.scrollTop;
      this.suppressScrollY = true;
    } else {
      this.handleScroll();
      this.suppressScrollY = false;
    }
  }

  /**
   * Handle scroll events
   * @returns {null} no return necessary
   */
  handleScroll = () => {
    if (this.props.onScroll) {
      this.props.onScroll(this.scrollData);
    }
  }

  /**
   * Handle real cell resize events
   * @returns {null} no return necessary
   */
  onResize = () => {
    this.setScrollBarDims();
    this.setScrollBarWrapperDims();

    this.setRowHeights();
    this.setColumnWidths();

    this.setScrollData();
    this.handleScroll();
  }

  /**
   * Set
   * @returns {null} no return necessary
   */
  setScrollBarPaddings() {
    var scrollPadding = '0px 0px ' + this.xScrollSize + 'px 0px';
    this.table.style.padding = scrollPadding;

    var scrollPadding = '0px ' + this.yScrollSize + 'px 0px 0px';
    this.xWrapper.firstChild.style.padding = scrollPadding;
  }

  /**
   * Set scroll bar wrappers size
   * @returns {null} no return necessary
   */
  setScrollBarWrapperDims = () => {
    this.xScrollbar.style.width = 'calc(100% - ' + this.yScrollSize + 'px)';
    this.yScrollbar.style.height = 'calc(100% - ' + this.stickyHeader.offsetHeight + 'px)';
    this.yScrollbar.style.top = this.stickyHeader.offsetHeight + 'px';
  }

  /**
   * Set visible scroll bar elements size
   * @return {null} no return necessary
   */
  setScrollBarDims() {
    this.xScrollSize = this.xScrollbar.offsetHeight - this.xScrollbar.clientHeight;
    this.yScrollSize = this.yScrollbar.offsetWidth - this.yScrollbar.clientWidth;

    if (!this.isFirefox) {
      this.setScrollBarPaddings();
    }

    var width = this.getSize(this.realTable.firstChild).width;
    this.xScrollbar.firstChild.style.width = width + 'px';

    var height = this.getSize(this.realTable).height + this.xScrollSize - this.stickyHeader.offsetHeight;
    this.yScrollbar.firstChild.style.height = height + 'px';

    if (this.xScrollSize) this.xScrollbar.style.height = this.xScrollSize + 1 + 'px';
    if (this.yScrollSize)  this.yScrollbar.style.width = this.yScrollSize + 1  + 'px';
  }

  /**
   * Get the height of each row in the table
   * @returns {null} no return necessary
   */
  setRowHeights() {
    var r, cellToCopy, height;

    if (this.props.stickyColumnCount) {
      for (r = 0; r < this.rowCount; r++) {
        cellToCopy = this.realTable.childNodes[r].firstChild;

        if (cellToCopy) {
          height = this.getSize(cellToCopy).height;
          this.stickyColumn.firstChild.childNodes[r].firstChild.style.height = height + 'px';

          if (r === 0 && this.stickyCorner.firstChild.childNodes[r]) {
            this.stickyCorner.firstChild.firstChild.firstChild.style.height = height + 'px';
          }
        }
      }
    }
  }

  /**
   * Get the width of each column in the table
   * @returns {null} no return necessary
   */
  setColumnWidths() {
    var c, cellToCopy, cellStyle, width, cell, stickyWidth;

    if (this.stickyHeaderCount) {
      stickyWidth = 0;

      for (c = 0; c < this.columnCount; c++) {
        cellToCopy = this.realTable.firstChild.childNodes[c];

        if (cellToCopy) {
          width = this.getSize(cellToCopy).width;

          cell = this.table.querySelector('#sticky-header-cell-' + c);

          cell.style.width = width + 'px';
          cell.style.minWidth = width + 'px';

          const fixedColumnsHeader = this.stickyCorner.firstChild.firstChild;
          if (fixedColumnsHeader && fixedColumnsHeader.childNodes[c]) {
            cell = fixedColumnsHeader.childNodes[c];
            cell.style.width = width + 'px';
            cell.style.minWidth = width + 'px';

            cell = fixedColumnsHeader.childNodes[c];
            cell.style.width = width + 'px';
            cell.style.minWidth = width + 'px';

            stickyWidth += width;
          }
        }
      }

      this.stickyColumn.firstChild.style.width = stickyWidth + 'px';
      this.stickyColumn.firstChild.style.minWidth = stickyWidth + 'px';
    }
  }

  /**
   * Get the jsx cells for sticky columns by copying
   * children elements
   * @param {array} rows provided child row elements
   * @returns {array} array of <Row> elements for sticky column
   */
  getStickyColumns(rows) {
    const columnsCount = this.props.stickyColumnCount;
    var cells;
    var stickyRows = [];

    rows.forEach((row, r) => {
      cells = React.Children.toArray(row.props.children);

      stickyRows.push(
        <Row {...row.props} id='' key={r}>
          {cells.slice(0, columnsCount)}
        </Row>
      );
    });

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

    React.Children.toArray(row.props.children).forEach((cell, c) => {
      cells.push(React.cloneElement(cell, {id: 'sticky-header-cell-' + c, key: c}));
    });

    return (
      <Row {...row.props} id='sticky-header-row'>
        {cells}
      </Row>
    );
  }

  /**
   * Get the jsx cells for sticky columns by copying
   * children elements
   * @param {array} rows provided child row elements
   * @returns {array} array of <Row> elements for sticky column
   */
  getStickyCorner(rows) {
    const columnsCount = this.props.stickyColumnCount;
    var cells;
    var stickyCorner = [];

    rows.forEach((row, r) => {
      if (r === 0) {
        cells = React.Children.toArray(row.props.children);

        stickyCorner.push(
          <Row {...row.props} id='' key={r}>
            {cells.slice(0, columnsCount)}
          </Row>
        );
      }
    });

    return stickyCorner;
  }

  /**
   * Get innerWidth and innerHeight of elements
   * @param  {object} node dom object
   * @return {object} dimensions
   */
  getSize(node) {
    var width = node ? node.getBoundingClientRect().width : 0;
    var height = node ? node.getBoundingClientRect().height : 0;

    return {width, height};
  }

  /**
   * Get the column and header to render
   * @returns {null} no return necessary
   */
  render() {
    var rows = React.Children.toArray(this.props.children);
    var stickyColumn, stickyHeader, stickyCorner;

    this.rowCount = rows.length;
    this.columnCount = (rows[0] && React.Children.toArray(rows[0].props.children).length) || 0;

    if (rows.length) {
      if (this.props.stickyColumnCount > 0 && this.stickyHeaderCount > 0) {
        stickyCorner = this.getStickyCorner(rows);
      }
      if (this.props.stickyColumnCount > 0) {
        stickyColumn = this.getStickyColumns(rows);
      }
      if (this.stickyHeaderCount > 0) {
        stickyHeader = this.getStickyHeader(rows);
      }
    }

    return (
      <div className={'sticky-table ' + (this.props.className || '')} id={'sticky-table-' + this.id}>
        <div id='x-scrollbar'><div></div></div>
        <div id='y-scrollbar'><div></div></div>
        <div className='sticky-table-corner' id='sticky-table-corner'>
          <Table>{stickyCorner}</Table>
        </div>
        <div className='sticky-table-header' id='sticky-table-header'>
          <Table>{stickyHeader}</Table>
        </div>
        <div className='sticky-table-y-wrapper' id='sticky-table-y-wrapper'>
          <div className='sticky-table-column' id='sticky-table-column'>
            <Table>{stickyColumn}</Table>
          </div>
          <div className='sticky-table-x-wrapper' id='sticky-table-x-wrapper'>
            <Table onResize={this.onResize}>{rows}</Table>
          </div>
        </div>
      </div>
    );
  }
}

export {StickyTable, Table, Row, Cell};
