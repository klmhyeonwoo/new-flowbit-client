import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import { Dispatch, SetStateAction } from "react";

interface categoryProps {
  list: string[];
  setCategory: Dispatch<SetStateAction<string>>;
  setSelect: Dispatch<SetStateAction<boolean>>;
}
export default function CategoryList({
  list,
  setCategory,
  setSelect,
  ...props
}: categoryProps) {
  return (
    <table
      id="cetegory-list"
      css={css`
        ${DESIGN_SYSTEM_TEXT.B2}
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 3.7rem;
        height: auto;
        left: 50%;
        transform: translate(-50%, 0%);
        white-space: nowrap;
        border-radius: 0.2rem;
        background-color: white;
        border: solid 0.05rem ${DESIGN_SYSTEM_COLOR.GRAY_200};
        color: ${DESIGN_SYSTEM_COLOR.KREAM} !important;
      `}
      onMouseLeave={() => setSelect(false)}
      {...props}
    >
      {list.map((item) => {
        return (
          <td
            key={item}
            css={css`
              padding: 1rem 2.84rem;
              border: solid 0.05rem ${DESIGN_SYSTEM_COLOR.GRAY_200};

              &:hover {
                background-color: #e8f2ff;
              }
            `}
            onClick={(event) =>
              setCategory((event.target as HTMLElement).textContent as string)
            }
          >
            {item}
          </td>
        );
      })}
    </table>
  );
}
