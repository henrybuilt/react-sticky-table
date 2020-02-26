import React from 'react';
import styled from 'styled-components';

var getBorder = (props) => `${props.borderWidth === undefined ? '2px' : (props.borderWidth || '0px')} solid ${props.borderColor || '#e5e5e5'}`

const Table = styled('div').attrs({
  className: 'sticky-table-table'
})`
  white-space: nowrap;
  display: table;
  box-sizing: border-box;
`;

Table.displayName = 'Table';

const Cell = styled('div').attrs({
  className: 'sticky-table-cell'
})`
  display: table-cell;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  background-color: #fff;
`;

Cell.displayName = 'Cell';

const Row = styled('div').attrs({
  className: 'sticky-table-row'
})`
  display: table-row;
`;

Row.displayName = 'Row';

const Wrapper = styled('div').attrs({
  className: 'sticky-table'
})`
  position: relative;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;


  & ${Row}:not(:last-child) ${Cell} {
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

function StickyTable({
  leftStickyColumnCount = 1,
  stickyHeaderCount = 1,
  wrapperRef,
  children,
  ...restProps
}) {
  return (
    <Wrapper
      ref={wrapperRef}
      leftStickyColumnCount={leftStickyColumnCount}
      stickyHeaderCount={stickyHeaderCount}
      {...restProps}
    >
      <Table>{children}</Table>
    </Wrapper>
  );
}

export { StickyTable, Table, Row, Cell };
