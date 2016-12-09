import React, {Component} from 'react';
var proxy = require('nodeproxy');
import ReactResizeDetector from 'react-resize-detector';
import Table from '../Table';
import Row from '../Table/Row';
import Cell from '../Table/Cell';
import './index.scss';

export default class StickyTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowHeights: [],
      columnWidths: [],
      scrollLeft: 0,
      scrollTop: 0
    }

    this.renderedRows = 0;
    this.renderedColumns = 0;
    this.start = new Date();

    this.handleResize = this.handleResize.bind(this);
    this.handleScrollX = this.handleScrollX.bind(this);
  }

  componentDidMount() {
    document.getElementById('sticky-table-x-wrapper').addEventListener('scroll', this.handleScrollX);
  }

  componentWillUnmount() {
    document.getElementById('sticky-table-x-wrapper').removeEventListener('scroll', this.handleScrollX);
  }

  handleScrollX() {//TODO improve
    //Toggle sticky header position (it's always displayed);
    var scrollLeft = document.getElementById('sticky-table-x-wrapper').scrollLeft;

    document.getElementById('sticky-header').style.transform = 'translate(' + (-1 * scrollLeft) + 'px, 0)';
  }

  /**
   * Get the height of each row in the table
   */
  setRowHeights() {
    for (var r = 0; r < this.props.rowCount; r++) {
      var rowToCopy = document.getElementById('row-' + r);

      if (rowToCopy) {
        var height = rowToCopy.clientHeight;

        document.getElementById('sticky-column-first-cell-' + r).style.height = height + 'px';
      }
    }
  }

  /**
   * Get the width of each column in the table
   */
  setColumnWidths() {
    for (var c = 0; c < this.props.columnCount; c++) {
      var cellToCopy = document.getElementById('header-cell-' + c);

      if (cellToCopy) {
        var computedStyle = getComputedStyle(cellToCopy);
        var width = cellToCopy.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
        var cell = document.getElementById('sticky-header-cell-' + c);

        cell.style.width = width + 'px';
        cell.style.minWidth = width + 'px';
      }
    }
  }

  /**
   * Get the jsx first columns rows by copying
   * children elements
   */
  getStickyRows(rows) {
    var stickyRows = [];

    if (rows.length === this.props.rowCount) {
      this.renderedRows = rows.length;

      rows.forEach(proxy((row, r) => {
        var cells = row.props.children;

        stickyRows.push(<Row {...row.props} id='' key={r}><Cell id={'sticky-column-first-cell-' + r}/>{cells[0]}</Row>);
      }, this));
    }

    return stickyRows;
  }

  /**
   * Get the jsx header cells and row by copying
   * children elements
   */
  getStickyHeaderRow(rows) {
    var row = rows[0];
    var cells = [];

    if (row.props.children.length === this.props.columnCount) {
      row.props.children.forEach((cell, c) => {
        cells.push(<Cell {...cell.props} id={'sticky-header-cell-' + c} key={c}/>);
      });

      this.renderedColumns = cells.length;
    }

    return (<Row {...row.props} id=''>{cells}</Row>);
  }

  /**
   * Handle resize events
   */
  handleResize(prop) {
    console.log(prop);
    this.setRowHeights();
    this.setColumnWidths();
  }

  /**
   * Get the column and header to render
   */
  render() {
    var rows = React.Children.toArray(this.props.children);
    var stickyRows, stickyHeaderRow;

    if (rows.length) {
      stickyRows = this.getStickyRows(rows);
      stickyHeaderRow = this.getStickyHeaderRow(rows);
    }

    return (
      <div className={'sticky-table ' + this.props.className}>
        <div className='sticky-table-y-wrapper'>
          <div className='sticky-header' id='sticky-header'>
            <Table>
              {stickyHeaderRow}
            </Table>
          </div>
          <div className='sticky-column' id='sticky-column'>
            <Table>
              {stickyRows}
            </Table>
          </div>
          <div className='sticky-table-x-wrapper' id='sticky-table-x-wrapper'>
            <Table>
              <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}/>
              {rows}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
