import { css } from "@emotion/react";
import CheckBox from "@/components/common/checkbox.tsx";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";

interface boxProps {
  text: string;
  checked: boolean;
}
export default function TextWithCheckBox({ text, checked = false }: boxProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 1.6rem;
      `}
    >
      <CheckBox checked={checked} />
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.7rem;

          span {
            ${DESIGN_SYSTEM_TEXT.E_S2}
          }
        `}
      >
        <span
          css={css`
            color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
          `}
        >
          [필수]
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
}
