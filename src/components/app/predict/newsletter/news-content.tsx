import { css } from "@emotion/react";

type contentsProps = {
  title: string;
  content: string;
};

export default function NewContents({ title, content }: contentsProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 4px;
      `}
    >
      <div
        css={css`
          color: #222222;
          font-weight: 600;
          line-height: 22px;
          font-size: 14px;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        `}
      >
        {title.replace(/<[^>]*>?/g, "")}
      </div>
      <div
        css={css`
          color: #616161;
          font-weight: 200;
          line-height: 18px;
          font-size: 12px;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        `}
      >
        {content.replace(/<[^>]*>?/g, "")}
      </div>
    </div>
  );
}
