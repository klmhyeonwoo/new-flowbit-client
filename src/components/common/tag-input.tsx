import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

export default function TagInput({ ...props }) {
  return (
    <input
      {...props}
      css={css`
        border: none;
        background: transparent;
        color: ${DESIGN_SYSTEM_COLOR.GRAY_700};

        &::placeholder {
          color: ${DESIGN_SYSTEM_COLOR.GRAY_400};
        }

        &:focus {
          outline: none;
        }
      `}
    />
  );
}
