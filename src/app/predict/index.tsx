import Chart from "@/components/app/predict/chart/chart";
import FitNess from "@/components/app/predict/fitness/fitness";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable";
import { css } from "@emotion/react";
import { Fragment } from "react";
import UseApiNewLetter from "@/hooks/api/newsletter/UseApiNewLetter";
import NewsCard, {
  newsLetterProps,
} from "@/components/app/predict/newsletter/news-card";

export default function PredictPage() {
  const { data } = UseApiNewLetter();

  return (
    <Fragment>
      <article
        css={css`
          max-width: 111.6rem;
          margin: 0 auto;
          padding-top: 9.7rem;
        `}
      >
        {/* 차트 */}
        <Chart></Chart>
        <div
          css={css`
            display: flex;
            gap: 1.6rem;
          `}
        >
          {/* 모델 적합도 */}
          <div>
            <h2
              css={css`
                ${DESIGN_SYSTEM_TEXT.S1}
                margin-bottom: 2rem;
              `}
            >
              모델 적합도
            </h2>
            <p
              css={css`
                ${DESIGN_SYSTEM_TEXT.B2}
                color: ${DESIGN_SYSTEM_COLOR.GRAY_700};
              `}
            >
              모델에 대한 설명 및 적합도에 대한 내용 어쩌고모델에 대한 설명 및
              적합도에 대한 내용 어쩌고모델에 대한 설명 및 적합도에 대한 내용
              어쩌고
            </p>
            <FitNess fitnessScore={96}></FitNess>
          </div>
          <div>
            <h2
              css={css`
                ${DESIGN_SYSTEM_TEXT.S1}
                margin-bottom: 2rem;
              `}
            >
              뉴스레터
            </h2>
            {/* 뉴스레터 */}
            <div
              css={css`
                display: flex;
                gap: 2rem;
              `}
            >
              {data &&
                data.map((article: newsLetterProps["article"]) => {
                  return (
                    <NewsCard article={article} key={article.originalLink} />
                  );
                })}
            </div>
          </div>
        </div>
      </article>
    </Fragment>
  );
}
