import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Row from './Row';
import Cell from './Cell';

var index = 0;

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

    this.index = index = index + 1;
  }

  /**
   * Get the column and header to render
   * @returns {undefined}
   */
  render() {
    var {stickyColumnCount, stickyHeaderCount} = this.props;

    stickyColumnCount = Math.min(stickyColumnCount, 1);
    stickyHeaderCount = Math.min(stickyHeaderCount, 1);

    return (
      <div className={['sticky-table', `sticky-table-${this.index}`, this.props.className || ''].join(' ')}>
        <style>
          {`
            .sticky-table-${this.index} .sticky-table-row:nth-child(-n+${stickyHeaderCount}) .sticky-table-cell {
              position: -webkit-sticky;
              position: sticky;
              top: 0;
              z-index: 2;
            }
            .sticky-table-${this.index} .sticky-table-row .sticky-table-cell:nth-child(-n+${stickyColumnCount}) {
              position: -webkit-sticky;
              position: sticky;
              left: 0;
              z-index: 2;
            }
            .sticky-table-${this.index} .sticky-table-row:nth-child(-n+${stickyHeaderCount}) .sticky-table-cell:nth-child(-n+${stickyColumnCount}) {
              position: -webkit-sticky;
              position: sticky;
              top: 0;
              left: 0;
              z-index: 3;
            }
          `}
        </style>
        <Table>
          {this.props.children}
        </Table>
      </div>
    );
  }
}

export {StickyTable, Table, Row, Cell};
