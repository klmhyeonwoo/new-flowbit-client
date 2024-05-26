import { css } from "@emotion/react";
import { useEffect, useState } from "react";

type fitnessProps = {
  fitnessScore: number;
};

export default function FitNess({ fitnessScore }: fitnessProps) {
  const [count, setCount] = useState<number>(fitnessScore);
  const [score, setScore] = useState(0.5);
  const stepTime = Math.abs(Math.floor(1500 / (fitnessScore - 0)));

  useEffect(() => {
    let currentNumber: number = 0;
    const counter = setInterval(() => {
      currentNumber += 1;
      setCount(currentNumber);

      if (currentNumber === fitnessScore) {
        clearInterval(counter);
      }
    }, stepTime);
    
    return () => {
       clearInterval(counter)
    }
  }, [fitnessScore, stepTime]);

  setTimeout(() => {
    const scaledScore = fitnessScore / 100 / 2 + 0.5;
    /**  */
    if (scaledScore >= 0.97) {
      return setScore(0.97);
    }
    setScore(fitnessScore / 100 / 2 + 0.5);
  }, 100);

  return (
    <article
      css={css`
        position: relative;
        width: 355px;
        height: 218px;
        background: var(--gray50, #fafafa);
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          position: absolute;
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="284"
          height="143"
          viewBox="0 0 284 143"
          fill="none"
        >
          <path
            d="M280.492 142.298C282.453 142.298 284.048 140.705 283.999 138.741C283.563 121.266 279.916 104.011 273.231 87.8427C266.093 70.5784 255.63 54.8916 242.44 41.678C229.25 28.4645 213.591 17.9829 196.358 10.8318C179.124 3.68064 160.653 -8.16826e-07 142 0C123.347 8.16826e-07 104.876 3.68064 87.6424 10.8318C70.4089 17.9829 54.7502 28.4645 41.5602 41.678C28.3703 54.8916 17.9075 70.5784 10.7691 87.8427C4.08403 104.011 0.437256 121.266 0.00110096 138.741C-0.0479221 140.705 1.54659 142.298 3.5078 142.298C5.46901 142.298 7.054 140.705 7.10561 138.741C7.54018 122.201 11.0025 105.87 17.3307 90.5655C24.1121 74.1643 34.0518 59.2619 46.5822 46.709C59.1127 34.1561 73.9884 24.1986 90.3603 17.4051C106.732 10.6115 124.279 7.11489 142 7.11489C159.721 7.11489 177.268 10.6115 193.64 17.4051C210.012 24.1986 224.887 34.1561 237.418 46.709C249.948 59.2619 259.888 74.1643 266.669 90.5655C272.997 105.87 276.46 122.201 276.894 138.741C276.946 140.705 278.531 142.298 280.492 142.298Z"
            fill="url(#paint0_linear_2634_14355)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2634_14355"
              x1="0"
              y1="142.298"
              x2="284"
              y2="142.298"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0056CA" stopOpacity="0.16" />
              <stop offset="1" stopColor="#0056CA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        css={css`
          position: absolute;
          margin-top: 20px;
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="236"
          height="128"
          viewBox="0 0 236 128"
          fill="none"
        >
          <g filter="url(#filter0_d_2634_14357)">
            <path
              d="M225.53 125.119C225.53 96.5376 214.177 69.1271 193.967 48.9172C173.757 28.7073 146.346 17.3535 117.765 17.3535C89.1841 17.3535 61.7736 28.7073 41.5637 48.9172C21.3538 69.1271 10 96.5376 10 125.119L117.765 125.119H225.53Z"
              fill="url(#paint0_linear_2634_14357)"
              shapeRendering="crispEdges"
              id="curve"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2634_14357"
              x="0.473793"
              y="0.682654"
              width="234.583"
              height="126.818"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-7.14465" />
              <feGaussianBlur stdDeviation="4.7631" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0.337255 0 0 0 0 0.792157 0 0 0 0.08 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2634_14357"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2634_14357"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_2634_14357"
              x1="117.765"
              y1="17.3535"
              x2="117.765"
              y2="125.119"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.785" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div
          css={css`
            z-index: 2;
            position: absolute;
            background-color: #5664f9;
            background-color: transparent;
            margin-top: -5px;
            width: 236px;
            height: 128px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 0px 0px 200px 200px;
            transform-origin: center top;
            transform: rotate(${score}turn);
            transition: all 1.3s ease-in-out;

            &:before {
              z-index: -1;
              content: "";
              display: block;
              position: absolute;
              left: 100%;
              width: 0;
              height: 0;
              margin-left: -5px;
              border-bottom: 9px solid transparent;
              border-top: 9px solid transparent;
              border-left: 16px solid #717c8b;
              border-right: 16px solid transparent;
              background-color: transparent;
              -webkit-transform: rotate(0deg);
              -moz-transform: rotate(0deg);
              transform: rotate(0deg);
            }
          `}
        ></div>
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            row-gap: 0.7rem;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            justify-content: flex-end;
            margin-top: -1.3rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 0.3rem;

              span:nth-of-type(1) {
                font-size: 3.5rem;
                font-weight: 600;
              }
              span:nth-of-type(2) {
                font-size: 2.2rem;
              }
            `}
          >
            <span>{count}</span>
            <span>%</span>
          </div>
          <span
            css={css`
              color: #757575;
            `}
          >
            적합도
          </span>
        </div>
      </div>
    </article>
  );
}
