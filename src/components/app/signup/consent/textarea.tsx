import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import { PropsWithChildren } from "react";

export default function Textarea({ children }: PropsWithChildren) {
  return (
    <div
      css={css`
        ${DESIGN_SYSTEM_TEXT.E_B1}
        width: 45rem;
        height: 11rem;
        padding: 1.1rem 2.1rem;
        overflow-y: auto;
        border: solid;
        border-radius: 0.5rem;
        color: ${DESIGN_SYSTEM_COLOR.GRAY_400};
        border-color: ${DESIGN_SYSTEM_COLOR.GRAY_200};
      `}
    >
      {children}
    </div>
  );
}
