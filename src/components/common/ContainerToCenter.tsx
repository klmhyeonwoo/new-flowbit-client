import React, { PropsWithChildren } from "react";
import { css } from "@emotion/react";

export default function ContainerToCenter({
  children,
  ...props
}: PropsWithChildren & Omit<React.HTMLAttributes<HTMLDivElement>, "types">) {
  return (
    <section
      css={css`
        margin: 0 auto;
        width: 45rem;
        padding-top: 14rem;
        padding-bottom: 5rem;

        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
      {...props}
    >
      <article
        css={css`
          width: 100%;

          display: flex;
          flex-direction: column;
          row-gap: 1rem;

          a {
            color: #bdbdbd;
          }
        `}
      >
        {children}
      </article>
    </section>
  );
}
