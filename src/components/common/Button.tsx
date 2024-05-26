import { css } from "@emotion/react";

type buttonProps = {
  icon?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "types">;

export default function Button({ icon, children, ...props }: buttonProps) {
  return (
    <div
      css={css`
        position: relative;
        height: auto;
        display: flex;
        align-items: center;
      `}
    >
      {icon && (
        <img
          css={css`
            position: absolute;
            margin-left: 3.6rem;
          `}
          src={icon}
          alt="버튼 아이콘"
        />
      )}
      <button
        css={css`
          width: 100%;
          height: 5rem;
          border-radius: 0.5rem;
          background: #0056ca;
          font-size: 1.6rem;
          color: white;
          border: none;
          font-weight: 700;
        `}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
