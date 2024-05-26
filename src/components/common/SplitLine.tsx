import { css } from "@emotion/react";
import React from "react";

type splitLineProps = {
  text: string;
} & Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "types">;
export default function SplitLine({ text, ...props }: splitLineProps) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
        align-items: center;
        color: #bdbdbd;

        hr {
          width: 100%;
          height: 0.1rem;
          background: #eeeeee;
          border: 0;
        }
      `}
      {...props}
    >
      <hr />
      <span>{text}</span>
      <hr />
    </div>
  );
}
