/** @jsx jsx */
import { jsx, css } from "@emotion/core";

function Row({ children, ...rest }) {
  return (
    <div
      css={css({
        display: "table-row"
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Row;
