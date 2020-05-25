import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

var getBorder = (props) => `${props.borderWidth === undefined ? '2px' : (props.borderWidth || '0px')} solid ${props.borderColor || '#e5e5e5'}`

const Table = styled('div').attrs(() => ({
  className: 'sticky-table-table'
}))`
  white-space: nowrap;
  display: table;
  box-sizing: border-box;
`;

Table.displayName = 'Table';

const Cell = styled('div').attrs(() => ({
  className: 'sticky-table-cell'
}))`
  display: table-cell;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  background-color: #fff;
`;

Cell.propTypes = {
  childern: PropTypes.any
}

Cell.displayName = 'Cell';

const Row = styled('div').attrs(() => ({
  className: 'sticky-table-row'
}))`
  display: table-row;
`;

Row.propTypes = {
  /** Childrens of the Row. Can enforce this with a custom function to thor error if not Cells */
  children: PropTypes.node.isRequired
}

Row.displayName = 'Row';

const Wrapper = styled('div').attrs(() => ({
  className: 'sticky-table'
}))`
  position: relative;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;

  & ${Row}:not(:nth-last-child(-n+${props => (props.stickyFooterCount || 0) + 1})) ${Cell} {
    border-bottom: ${getBorder};
  }

  & ${Row}:nth-child(${props => `-n+${props.stickyHeaderCount}`}) ${Cell} {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: ${props => props.headerZ || 2};
  }
  & ${Row}:nth-last-child(-n+${props => props.stickyFooterCount}) ${Cell} {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0px;
    z-index: ${props => props.footerZ || 2};
    border-top: ${getBorder};
  }
  & ${Row} ${Cell}:nth-child(-n+${props => props.leftStickyColumnCount}) {
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
    z-index: ${props => props.leftColumnZ || 2};
    border-right: ${getBorder};
  }
  & ${Row} ${Cell}:nth-last-child(-n+${props => props.rightStickyColumnCount}) {
    position: -webkit-sticky;
    position: sticky;
    right: 0px;
    z-index: ${props => props.rightColumnZ || 2};
    border-left: ${getBorder};
  }

  ${props => {
    var insets = props.stickyInsets;
    var styles = '';
    var i;

    for (i = 0; i < insets.header.length; i++) {
      styles += `& ${Row}:nth-child(${i + 1}) ${Cell} { top: ${insets.header[i]}px; }`
    }

    for (i = 0; i < insets.footer.length; i++) {
      styles += `& ${Row}:nth-last-child(${i + 1}) ${Cell} { bottom: ${insets.footer[i]}px; }`
    }

    for (i = 0; i < insets.leftColumn.length; i++) {
      styles += `& ${Row} ${Cell}:nth-child(${i + 1}) { left: ${insets.leftColumn[i]}px; }`
    }

    for (i = 0; i < insets.rightColumn.length; i++) {
      styles += `& ${Row} ${Cell}:nth-last-child(${i + 1}) { right: ${insets.rightColumn[i]}px; }`
    }

    return css`${styles}`;
  }}

  & ${Row}:nth-child(-n+${props => props.stickyHeaderCount}) ${Cell}:nth-child(-n+${props => props.leftStickyColumnCount}) {
    z-index: ${props => Math.max(props.headerZ || 2, props.leftColumnZ || 2) + 1};
  }
  & ${Row}:nth-child(-n+${props => props.stickyHeaderCount}) ${Cell}:nth-last-child(-n+${props => props.rightStickyColumnCount}) {
    z-index: ${props => Math.max(props.headerZ || 2, props.rightColumnZ || 2) + 1};
  }
  & ${Row}:nth-last-child(-n+${props => props.stickyFooterCount}) ${Cell}:nth-child(-n+${props => props.leftStickyColumnCount}) {
    z-index: ${props => Math.max(props.footerZ || 2, props.leftColumnZ || 2) + 1};
  }
  & ${Row}:nth-last-child(-n+${props => props.stickyFooterCount}) ${Cell}:nth-last-child(-n+${props => props.rightStickyColumnCount}) {
    z-index: ${props => Math.max(props.footerZ || 2, props.rightColumnZ || 2) + 1};
  }
`;

Wrapper.displayName = 'Wrapper';

class StickyTable extends React.Component {
  state = {
    stickyInsets: {
      header: [],
      footer: [],
      leftColumn: [],
      rightColumn: []
    }
  }

  componentDidMount() {
    this.considerSchedulingMultipleStickiesInterval();
  }

  componentDidUpdate() {
    this.considerSchedulingMultipleStickiesInterval();
  }

  componentWillUnmount() {
    this.clearMultipleStickiesInterval();
  }

  //HINT schedule an interval to poll cell sizes for changes at 60fps
  //WARNING avoid doing this unless user has at least 2 stickies somewhere
  considerSchedulingMultipleStickiesInterval() {
    var p = this.props;
    var shouldSchedule = [
      p.stickyHeaderCount, p.stickyFooterCount, p.leftStickyColumnCount, p.rightStickyColumnCount
    ].some(count => count > 1);

    this.clearMultipleStickiesInterval();

    if (shouldSchedule) {
      this.multipleStickiesInterval = setInterval(this.checkForStickySizeChanges.bind(this), 1000 / 60);
    }
  }

  clearMultipleStickiesInterval() {
    if (this.multipleStickiesInterval) {
      clearInterval(this.multipleStickiesInterval);

      delete this.multipleStickiesInterval;
    }
  }

  checkForStickySizeChanges() {
    var s, stickyInsets = {};
    var {props, tableNode} = this;
    var rowNodes = tableNode.querySelectorAll('.sticky-table-row');
    var cellNodes = tableNode.querySelectorAll('.sticky-table-cell');

    [
      ['header', 'height', 'stickyHeaderCount'],
      ['footer', 'height', 'stickyFooterCount'],
      ['leftColumn', 'width', 'leftStickyColumnCount'],
      ['rightColumn', 'width', 'rightStickyColumnCount']
    ].forEach(([stickyKey, sizeKey, countPropKey]) => {
      var insets = [];

      if (props[countPropKey] > 1) {
        insets = [0]
        var count = props[countPropKey];
        var netInset = 0;

        // HINT we only want this loop for the second sticky and up
        for (s = 1; s < count; s++) {
          var node = undefined;

          switch (stickyKey) {
          case 'header':
            node = rowNodes[s - 1].childNodes[0];
            break;
          case 'footer':
            node = rowNodes[rowNodes.length - s].childNodes[0];
            break;
          case 'leftColumn':
            node = cellNodes[s - 1];
            break;
          case 'rightColumn':
            node = cellNodes[cellNodes.length - s];
            break;
          }

          if (node) {
            var boundingRect = node.getBoundingClientRect();

            netInset += boundingRect[sizeKey];
          }

          insets.push(netInset);
        }
      }

      stickyInsets[stickyKey] = insets;
    });

    //HINT avoid a render unless there's actually a change
    if (JSON.stringify(stickyInsets) !== JSON.stringify(this.state.stickyInsets)) {
      this.setState({stickyInsets});
    }
  }

  setTableNodeRef = tableNode => {
    this.tableNode = tableNode
  }

  render() {
    var {leftStickyColumnCount, stickyHeaderCount, wrapperRef, children, ...restProps} = this.props;

    return (
      <Wrapper
        ref={wrapperRef}
        leftStickyColumnCount={leftStickyColumnCount}
        stickyHeaderCount={stickyHeaderCount}
        stickyInsets={this.state.stickyInsets}
        {...restProps}
      >
        <Table ref={this.setTableNodeRef}>{children}</Table>
      </Wrapper>
    );
  }
}

StickyTable.propTypes = {
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  children: PropTypes.any.isRequired,
  leftStickyColumnCount: PropTypes.number,
  rightStickyColumnCount: PropTypes.number,
  stickyHeaderCount: PropTypes.number,
  stickyFooterCount: PropTypes.number,
  wrapperRef: PropTypes.any,
}

StickyTable.defaultProps = {
  borderWidth: '2px',
  borderColor: '#e5e5e5',
  leftStickyColumnCount: 1,
  stickyHeaderCount: 1
}

export { StickyTable, Table, Row, Cell };
