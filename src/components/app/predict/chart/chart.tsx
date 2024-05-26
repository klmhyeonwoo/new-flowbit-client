/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetChartDataQuery, useGetPredictPriceQuery } from "@/api/chartApi";
import { Chart as ChartLib, ChartType } from "@/lib/Chart";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable";
import BITImg from "@/assets/Bitcoin.svg";
import ETHImg from "@/assets/eth.png";
import XRPImg from "@/assets/xrp.png";

import DownArrow from "@/assets/down-arrow.svg";

const setChart = (chartData: ChartType) => {
  const chart = new ChartLib(chartData);

  chart.render();
};

const COIN_LIST: CoinType[] = ["BTC", "ETH", "XRP"];
const COIN_TO_IMG = {
  BTC: BITImg,
  ETH: ETHImg,
  XRP: XRPImg,
};
const COIN_DICT = {
  BTC: "비트코인",
  ETH: "이더리움",
  XRP: "리플",
};
export type CoinType = "BTC" | "ETH" | "XRP";

// Chart 컴포넌트
export default function Chart() {
  const [coinType, setCoinType] = useState(COIN_LIST[0]);

  // 차트 데이터 가지고 오기
  const getChartDataResponse = useGetChartDataQuery(coinType);

  // 차트 예측 가격 리스트 가져오기
  const getPredictPriceResponse = useGetPredictPriceQuery();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCoinType = (coinType: CoinType) => {
    setCoinType(coinType);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // 차트가 생성될 div 태그 생성
    const chart = document.createElement("div");
    chart.style.width = "100%";
    chart.style.position = "relative";
    chart.setAttribute("id", "chart");
    document.getElementById("chartContainer")?.appendChild(chart);

    // 차트에 데이터 적용
    if (getChartDataResponse.isSuccess) {
      setChart(getChartDataResponse.data);
    }

    // useEffect가 두 번 호출 되면 차트가 두개 그려지므로 기존에 있는 차트 삭제
    return () => {
      document.getElementById("chart")?.remove();
    };
  }, [getChartDataResponse.data, getChartDataResponse.isSuccess]);

  return (
    <div>
      {/* Header */}
      <div
        css={css`
          width: 42.2rem;
          position: relative;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 1.6rem;
            padding-left: 2rem;
            position: relative;
          `}
        >
          {/* Icon */}
          <img src={COIN_TO_IMG[coinType]} alt="" />
          {/* Title */}
          <span
            css={css`
              ${DESIGN_SYSTEM_TEXT.T1}
              color: #323743;
            `}
          >
            {COIN_DICT[coinType]}
          </span>
          {/* Number */}
          <span
            css={css`
              ${DESIGN_SYSTEM_TEXT.S1}
              color: ${DESIGN_SYSTEM_COLOR.GRAY_700};
            `}
          >
            {getPredictPriceResponse.isSuccess
              ? getPredictPriceResponse.data?.data[
                  coinType
                ].predicted_data.predicted_krw.toLocaleString("ko-KR")
              : ""}{" "}
            KWR
          </span>
          {/* Icon */}
          <img
            onClick={handleDropdown}
            css={css`
              cursor: pointer;
            `}
            src={DownArrow}
            alt=""
          />
        </div>
        {/* DROP DOWN */}
        <div
          css={css`
            width: 100%;
            position: absolute;
            transform: translateY(100%);
            bottom: -1.6rem;
            left: 2rem;
            background-color: white;
            border: 1px solid ${DESIGN_SYSTEM_COLOR.GRAY_200};
            z-index: 1;

            display: ${isDropdownOpen ? "block" : "none"};
          `}
        >
          <ul
            css={css`
              list-style: none;
              width: 100%;
              padding: 0;
              margin: 0;

              & > li {
                color: #121212;
                display: flex;
                justify-content: space-between;
                padding: 16px;
                cursor: pointer;
              }

              & > li.selected {
                background-color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE} !important;
                color: white;
              }

              & > li:hover {
                background-color: ${DESIGN_SYSTEM_COLOR.BLUEGRAY_100};
              }
            `}
          >
            {COIN_LIST.map((row) => (
              <li
                key={row + "coinlist"}
                onClick={() => handleCoinType(row)}
                className={row === coinType ? "selected" : ""}
              >
                <span
                  css={css`
                    ${DESIGN_SYSTEM_TEXT.S1}
                  `}
                >
                  {COIN_DICT[row]}
                </span>
                <span
                  css={css`
                    ${DESIGN_SYSTEM_TEXT.S3}
                  `}
                >
                  {getPredictPriceResponse.data?.data[
                    row
                  ].predicted_data.predicted_krw.toLocaleString("ko-KR")}{" "}
                  KRW
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Chart */}
      <div
        css={css`
          width: 1116px;
        `}
        id="chartContainer"
      >
        <div
          id="chart"
          css={css`
            width: 1116px;
            position: relative;
          `}
        ></div>
      </div>
    </div>
  );
}
