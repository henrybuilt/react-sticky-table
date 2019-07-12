/** @jsx jsx */
import { jsx, css } from "@emotion/core";

function Cell({ children, ...rest }) {
  return (
    <div
      css={css({
        display: "table-cell",
        boxSizing: "border-box"
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Cell;
