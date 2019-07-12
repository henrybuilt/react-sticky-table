/** @jsx jsx */
import { jsx, css } from "@emotion/core";

function Table({ children, ...rest }) {
  return (
    <div
      css={css({
        display: "table",
        boxSizing: "border-box"
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Table;
