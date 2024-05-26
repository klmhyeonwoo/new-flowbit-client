import { css } from "@emotion/react";
import NewsTag from "./news-tag";
import NewContents from "./news-content";
import NewImage from "./news-image";
import Arrow from "@/assets/arrow.svg?react";

export type newsLetterProps = {
  article: {
    description: string;
    img: string;
    newsViewCount: number;
    originalLink: string;
    preview_link: string;
    pubDate: string;
    tag: string[];
    title: string;
  };
};

export default function NewsCard({ article }: newsLetterProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 8px;
        width: 232px;
      `}
    >
      <NewImage src={article.img} date={article.pubDate} />
      <div
        css={css`
          display: flex;
          column-gap: 8px;
        `}
      >
        {article.tag.map((tag) => {
          return <NewsTag tagName={tag} key={tag} />;
        })}
      </div>
      <NewContents title={article.title} content={article.description} />
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 17px;
          margin-top: 12px;
        `}
      >
        <div
          css={css`
            font-size: 12px;
            font-weight: 600;
          `}
        >
          Read More
        </div>
        <Arrow />
      </div>
    </div>
  );
}
