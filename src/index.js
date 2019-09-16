import React from 'react';
import styled from 'styled-components';

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
  border-bottom: 2px solid #e5e5e5;
  background-color: #fff;
`;

Cell.displayName = 'Cell';

const Row = styled('div').attrs({
  className: 'sticky-table-row'
})`
  display: table-row;

  & ${Cell}:first-child {
    border-right: 2px solid #e5e5e5;
  }
`;

Row.displayName = 'Row';

const Wrapper = styled('div').attrs({
  className: 'sticky-table'
})`
  position: relative;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;

  & ${Row}:nth-child(${props => `-n+${props.stickyHeaderCount}`}) ${Cell} {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  & ${Row} ${Cell}:nth-child(-n+${props => props.stickyColumnCount}) {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 2;
  }
  & ${Row}:nth-child(-n+${props =>
  props.stickyHeaderCount}) ${Cell}:nth-child(-n+${props =>
  props.stickyColumnCount}) {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 3;

    &:first-child {
      border-right: 2px solid #e5e5e5;
    }
  }
`;

Wrapper.displayName = 'Wrapper';

function StickyTable({
  stickyColumnCount = 1,
  stickyHeaderCount = 1,
  wrapperRef,
  children,
  ...rest
}) {
  return (
    <Wrapper
      ref={wrapperRef}
      stickyColumnCount={stickyColumnCount}
      stickyHeaderCount={stickyHeaderCount}
      {...rest}
    >
      <Table>{children}</Table>
    </Wrapper>
  );
}

export { StickyTable, Table, Row, Cell };
