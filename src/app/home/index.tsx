import Button from "@/components/common/Button";
import Lottie from "lottie-react";
import { BREAK_POINTS, DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { css } from "@emotion/react";
import {
  COMMUNITY_URL,
  NEWS_LETTER_URL,
  PREDICT_URL,
  numberWithCommas,
} from "@/utils/util";
import BitImg from "@/assets/blue_bit.svg";
import EtherImg from "@/assets/blue_ether.svg";
import RippleImg from "@/assets/blue_rip.svg";
import Chart1 from "@/assets/chart1.svg";
import MOBILE_CHART1 from "@/assets/mobile_chart1.svg";
import MOBILE_CHART2 from "@/assets/mobile_chart2.svg";
import MOBILE_CHART3 from "@/assets/mobile_chart3.svg";
import Chart2 from "@/assets/chart2.svg";
import Chart3 from "@/assets/chart3.svg";
import MAINBOTTOMIMG from "@/assets/main-bottom.png";
import NewletterAni from "@/assets/newletter.json";
import CommunityAni from "@/assets/community.json";
import { useGetChartDataQuery } from "@/api/chartApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CoinInfoType = {
  [coin in "BTC" | "ETH" | "XRP"]: {
    price: number; // 가격
    persent: number; // 상승률 혹은 하락률
    datas: unknown[]; // 그래프 데이터
  };
};

export default function HomePage() {
  // 차트 데이터 가지고 오기
  const getBTCData = useGetChartDataQuery("BTC");
  const getETHData = useGetChartDataQuery("ETH");
  const getXRPData = useGetChartDataQuery("XRP");

  const [coinInfo, setCoinInfo] = useState<CoinInfoType>();

  const navigation = useNavigate();

  useEffect(() => {
    if (!getBTCData.isSuccess || !getETHData.isSuccess || !getXRPData.isSuccess)
      return;

    // get BTC, 0번째 인덱스는 항상 실제 BTC로 가정해야 한다.
    let lastIndex = getBTCData.data?.datas[0].data.length - 1;
    const btcPrice = getBTCData.data?.datas[0].data[lastIndex];
    const prevBtcPrice = getBTCData.data?.datas[0].data[lastIndex - 1];

    // get ETH
    lastIndex = getETHData.data?.datas[0].data.length - 1;
    const ethPrice = getETHData.data?.datas[0].data[lastIndex];
    const prevEthPrice = getETHData.data?.datas[0].data[lastIndex - 1];

    // get XRP
    lastIndex = getXRPData.data?.datas[0].data.length - 1;
    const xrpPrice = getXRPData.data?.datas[0].data[lastIndex];
    const prevXrpPrice = getXRPData.data?.datas[0].data[lastIndex - 1];

    setCoinInfo({
      BTC: {
        price: btcPrice,
        datas: getBTCData.data?.datas,
        persent: ((btcPrice - prevBtcPrice) / prevBtcPrice) * 100,
      },
      ETH: {
        price: ethPrice,
        datas: getETHData.data?.datas,
        persent: ((ethPrice - prevEthPrice) / prevEthPrice) * 100,
      },
      XRP: {
        price: xrpPrice,
        datas: getXRPData.data?.datas,
        persent: ((xrpPrice - prevXrpPrice) / prevXrpPrice) * 100,
      },
    });
  }, [
    getBTCData.data?.datas,
    getBTCData.isSuccess,
    getETHData.data?.datas,
    getETHData.isSuccess,
    getXRPData.data?.datas,
    getXRPData.isSuccess,
  ]);

  return (
    <article
      css={css`
        max-width: 112rem;
        margin: 0 auto;
        padding-top: 9.8rem;

        ${BREAK_POINTS.TABLET} {
          max-width: 72.7rem;
          margin: 0 auto;
          padding-top: 9.8rem;
        }

        ${BREAK_POINTS.MOBILE} {
          max-width: 32rem;
          margin: 0 auto;
          padding-top: 9.8rem;
        }
      `}
    >
      {/* 메인 화면 */}
      <section>
        <div
          css={css`
            display: flex;
            justify-content: space-between;

            ${BREAK_POINTS.TABLET} {
              flex-direction: column;
            }

            ${BREAK_POINTS.MOBILE} {
              flex-direction: column;
            }
          `}
        >
          {/* LEFT SIDE */}
          <div>
            <h1
              css={css`
                font-size: 4.8rem;
                line-height: 7.2rem;

                ${BREAK_POINTS.TABLET} {
                }
                ${BREAK_POINTS.MOBILE} {
                  font-size: 2.4rem;
                  line-height: 3.6rem;
                }
              `}
            >
              데이터 속 예측력, <br />
              LSTM과 GPT가 선사하는 <br />
              비트코인 추세 예측 <br />
            </h1>
            <div
              css={css`
                display: flex;
                gap: 1.6rem;

                ${BREAK_POINTS.TABLET} {
                }
                ${BREAK_POINTS.MOBILE} {
                  margin-top: 4rem;
                }
              `}
            >
              <Button
                css={css`
                  width: 11.4rem;
                  height: 4.3rem;

                  ${DESIGN_SYSTEM_COLOR.GRAY_50}
                  font-size: 1.6rem;
                  font-weight: normal;
                `}
              >
                Get Started
              </Button>
              <Button
                css={css`
                  width: 8rem;
                  height: 4.3rem;

                  font-size: 1.6rem;
                  font-weight: normal;

                  color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
                  background-color: white;
                  border: 1px solid ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
                `}
              >
                Sign in
              </Button>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div
            css={css`
              width: 54.6rem;

              ${BREAK_POINTS.TABLET} {
                margin-top: 6.4rem;
                width: 100%;
              }
              ${BREAK_POINTS.MOBILE} {
                margin-top: 4rem;
                width: 100%;
              }

              & .card {
                width: 100%;
                padding: 2.8rem;
                border-radius: 1.6rem;
                border: 1px solid ${DESIGN_SYSTEM_COLOR.BLUEGRAY_100};
                background-color: rgba(249, 251, 255, 1);
                position: relative;
                cursor: pointer;

                & .desktop {
                  display: initial;
                }

                & .tablet {
                  display: none;
                }

                ${BREAK_POINTS.TABLET} {
                  & .desktop {
                    display: none;
                  }

                  & .tablet {
                    display: initial;
                  }
                }

                ${BREAK_POINTS.MOBILE} {
                  & .desktop {
                    display: none;
                  }

                  & .tablet {
                    display: none;
                  }

                  & .char-logo {
                    width: 3.2rem;
                    height: 3.2rem;
                  }
                }

                & .card-item {
                  width: 100%;
                  display: flex;
                  gap: 1.6rem;
                  align-items: center;
                  margin-bottom: 2rem;
                  padding-bottom: 2rem;
                  border-bottom: 1px solid #d4d7dc;

                  & .money {
                    font-size: 2rem;
                    color: #0056ca;
                    line-height: 3rem;
                    font-weight: bold;
                    padding-right: 0.5rem;
                  }

                  & .unit {
                    font-size: 1.2rem;
                    font-weight: 400;
                    padding-bottom: 0.5rem;
                    color: ${DESIGN_SYSTEM_COLOR.GRAY_800};
                  }

                  & .percent {
                    font-size: 1.6rem;
                    font-weight: bold;
                  }

                  & .percent.green {
                    color: ${DESIGN_SYSTEM_COLOR.GREEN_500};
                  }

                  & .percent.red {
                    color: ${DESIGN_SYSTEM_COLOR.RED_500};
                  }

                  ${BREAK_POINTS.MOBILE} {
                    & .money {
                      font-size: 1.6rem;
                    }

                    & .percent {
                      font-size: 1.2rem;
                    }
                  }
                }

                & .card-item:last-child {
                  border: none;
                  margin: 0;
                  padding: 0;
                }

                & .badge {
                  display: inline-block;
                  background-color: #2f3b4b;
                  padding: 8px 12px;
                  margin-bottom: 2.4rem;

                  font-size: 1.6rem;
                  font-weight: bold;
                  color: white;

                  border-radius: 24px;
                }
              }
            `}
          >
            {/* TOP */}
            <div className="card">
              {/* 비트코인 */}
              <div
                className="card-item"
                onClick={() => navigation(PREDICT_URL)}
              >
                {/* 이미지 */}
                <img className="char-logo" src={BitImg} alt="Logo Img" />
                <div
                  css={css`
                    width: 15rem;
                    display: flex;
                    justify-content: end;
                    align-items: end;
                  `}
                >
                  {/* 돈 */}
                  <span className="money">
                    {numberWithCommas(coinInfo?.BTC.price || 0)}
                  </span>
                  {/* 단위 */}
                  <span className="unit">KRW</span>
                </div>
                {/* 상승률 */}
                {coinInfo?.BTC.persent && coinInfo?.BTC.persent > 0 ? (
                  <span className="percent green">
                    + {coinInfo?.BTC.persent.toFixed(2)}%
                  </span>
                ) : (
                  <span className="percent red">
                    - {coinInfo?.BTC.persent.toFixed(2)}%
                  </span>
                )}
                {/* 차트 */}
                <div className="desktop">
                  <img src={Chart1} alt="" />
                </div>
                <div className="tablet">
                  <img src={MOBILE_CHART1} alt="" />
                </div>
              </div>
              {/* 이더리움 */}
              <div
                className="card-item"
                onClick={() => navigation(PREDICT_URL)}
              >
                {/* 이미지 */}
                <img className="char-logo" src={EtherImg} alt="Logo Img" />
                <div
                  css={css`
                    width: 15rem;
                    display: flex;
                    justify-content: end;
                    align-items: end;
                  `}
                >
                  {/* 돈 */}
                  <span className="money">
                    {numberWithCommas(coinInfo?.ETH.price || 0)}
                  </span>
                  {/* 단위 */}
                  <span className="unit">KRW</span>
                </div>
                {/* 상승률 */}
                {coinInfo?.ETH.persent && coinInfo?.ETH.persent > 0 ? (
                  <span className="percent green">
                    + {coinInfo?.ETH.persent.toFixed(2)}%
                  </span>
                ) : (
                  <span className="percent red">
                    - {coinInfo?.ETH.persent.toFixed(2)}%
                  </span>
                )}
                {/* 차트 */}
                <div className="desktop">
                  <img src={Chart2} alt="" />
                </div>
                <div className="tablet">
                  <img src={MOBILE_CHART2} alt="" />
                </div>
              </div>
              {/* 리플 */}
              <div
                className="card-item last"
                onClick={() => navigation(PREDICT_URL)}
              >
                {/* 이미지 */}
                <img className="char-logo" src={RippleImg} alt="Logo Img" />
                <div
                  css={css`
                    width: 15rem;
                    display: flex;
                    justify-content: end;
                    align-items: end;
                  `}
                >
                  {/* 돈 */}
                  <span className="money">
                    {numberWithCommas(coinInfo?.XRP.price || 0)}
                  </span>
                  {/* 단위 */}
                  <span className="unit">KRW</span>
                </div>
                {/* 상승률 */}
                {coinInfo?.XRP.persent && coinInfo?.XRP.persent > 0 ? (
                  <span className="percent green">
                    + {coinInfo?.XRP.persent.toFixed(2)}%
                  </span>
                ) : (
                  <span className="percent red">
                    - {Math.abs(Number(coinInfo?.XRP.persent.toFixed(2)))}%
                  </span>
                )}
                {/* 차트 */}
                <div className="desktop">
                  <img src={Chart3} alt="" />
                </div>
                <div className="tablet">
                  <img src={MOBILE_CHART3} alt="" />
                </div>
              </div>
            </div>
            {/* BOTTOM */}
            <div
              css={css`
                display: flex;
                margin-top: 2.2rem;
                gap: 2rem;

                ${BREAK_POINTS.MOBILE} {
                  flex-direction: column;
                }
              `}
            >
              {/* 뉴스레타 로티 */}
              <div className="card" onClick={() => navigation(NEWS_LETTER_URL)}>
                <div className="badge">뉴스레터</div>
                <Lottie animationData={NewletterAni} />
              </div>
              {/* 코멘트 로티 */}
              <div className="card" onClick={() => navigation(COMMUNITY_URL)}>
                <div className="badge">커뮤니티</div>
                <Lottie animationData={CommunityAni} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 이미지 */}
      <section
        css={css`
          margin-top: 21.4rem;
          width: 100%;
        `}
      >
        <img
          css={css`
            width: 100%;
          `}
          src={MAINBOTTOMIMG}
          alt=""
        />
      </section>
    </article>
  );
}
