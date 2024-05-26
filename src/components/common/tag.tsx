import { PropsWithChildren } from "react";
import { NativeButtonProps } from "./text/type";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable";

export default function Tag(
  props: PropsWithChildren<NativeButtonProps> & { selected: boolean },
) {
  return (
    <span
      css={css`
        ${DESIGN_SYSTEM_TEXT.B2}
        display: inline-flex;
        align-items: center;
        justify-content: spac;
        background-color: ${props.selected
          ? "#e8f2ff"
          : DESIGN_SYSTEM_COLOR.GRAY_100};
        border-radius: 3px;
        padding: 2px 5px;
        cursor: pointer;
        color: ${props.selected
          ? DESIGN_SYSTEM_COLOR.BRAND_BLUE
          : DESIGN_SYSTEM_COLOR.GRAY_600};
        font-weight: ${props.selected ? "bold" : ""};
        margin-right: 10px;
        margin-bottom: 7px;
        &:hover {
          background-color: #e8f2ff;
          color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
          font-weight: bold;
        }

        &:hover path {
          stroke: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
        }
      `}
      {...props}
    >
      {props.children}
    </span>
  );
}
