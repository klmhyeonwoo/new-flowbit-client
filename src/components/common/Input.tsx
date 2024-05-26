import { css } from "@emotion/react";
import { DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";

type inputProps = {
  placeholder: string;
  icon?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "types">;
export default function Input({
  placeholder = "텍스트를 입력해주세요",
  icon,
  ...props
}: inputProps) {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        align-items: center;
      `}
    >
      {icon && (
        <img
          src={icon}
          alt="입력 창 로고"
          css={css`
            position: absolute;
            z-index: 1;
            padding-left: 2rem;
          `}
        />
      )}
      <input
        {...DESIGN_SYSTEM_TEXT.B1}
        css={css`
          border: none;
          box-shadow: inset 0 0 0 1px #eeeeee;
          width: 100%;
          height: 5.6rem;
          border-radius: 0.5rem;
          padding-left: ${icon ? `6rem` : `2rem`};

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #bdbdbd;
          }
        `}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
