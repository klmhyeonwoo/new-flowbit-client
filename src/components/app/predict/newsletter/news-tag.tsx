import { css } from "@emotion/react";

type tagNameProps = {
  tagName: string;
};

export default function NewsTag({ tagName }: tagNameProps) {
  const platform: { [index: string]: { color: string } } = {
    비트코인: {
      color: "#0056CA",
    },
    이더리움: {
      color: "29D86F",
    },
    리플: {
      color: "E74C4C",
    },
  };

  return (
    <div
      css={css`
        border: none;
        background-color: #f5f5f5;
        color: ${tagName ? platform[tagName].color : "black"};
        padding: 2px 4px 2px 4px;
        border-radius: 2.5px;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
      `}
    >
      {tagName}
    </div>
  );
}
