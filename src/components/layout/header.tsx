import { css } from "@emotion/react";
import Logo from "../common/logo";
import B2_bold from "../common/text/B2_bold";
import E_caption from "../common/text/E_caption";
import { NavLink } from "react-router-dom";
import WhiteAlarm from "@/assets/alarm-white.svg";
import Alarm from "@/assets/alarm.svg";

const HOME_URL = "/";
const PREDICT_URL = "/predict";
const NEWS_LETTER_URL = "/newsletter";
const COMMUNITY_URL = "/community";
const LOGIN_URL = "/signin";
const REGISTER_URL = "/register";

export default function Header({ isScroll }: { isScroll: boolean }) {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 56px;
        background-color: ${isScroll ? "white" : "none"};
        color: ${isScroll ? "black" : "white"};
        position: ${isScroll ? "fixed" : "fixed"};
        border-bottom: ${isScroll ? "1px solid #f5f5f5" : "none"};
      `}
    >
      <div
        className="header__content"
        css={css`
          width: 100%;
          max-width: 1125px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 auto;

          & a {
            text-decoration: none;
            text-decoration-color: none;
            color: inherit;
          }
        `}
      >
        <Logo isWhite={!isScroll} />
        <nav>
          <ol
            css={css`
              font-family: "Pretandard";
              list-style: none;
              display: flex;
              align-items: center;
              padding: 0;
              margin: 0;

              & > li {
                margin: 0 30px;
              }

              & span {
                cursor: pointer;
              }

              & span:hover {
                color: #0056ca;
              }
            `}
          >
            <li>
              <NavLink to={HOME_URL}>
                <B2_bold>소개</B2_bold>
              </NavLink>
            </li>
            <li>
              <NavLink to={PREDICT_URL}>
                <B2_bold>비트코인 예측</B2_bold>
              </NavLink>
            </li>
            <li>
              <NavLink to={NEWS_LETTER_URL}>
                <B2_bold>뉴스레터</B2_bold>
              </NavLink>
            </li>
            <li>
              <NavLink to={COMMUNITY_URL}>
                <B2_bold>커뮤니티</B2_bold>
              </NavLink>
            </li>
          </ol>
        </nav>
        <div
          css={css`
            height: 44px;
            list-style: none;
            display: flex;
            align-items: center;
            padding: 0;
            margin: 0;
            gap: 20px;

            & span,
            & img {
              cursor: pointer;
            }
          `}
        >
          <NavLink to={LOGIN_URL}>
            <E_caption
              css={css`
                color: ${isScroll ? "#424242" : "white"};
              `}
            >
              로그인
            </E_caption>
          </NavLink>
          <div
            css={css`
              color: ${isScroll ? "#424242" : "white"};
            `}
          >
            l
          </div>
          <NavLink to={REGISTER_URL}>
            <E_caption
              css={css`
                color: ${isScroll ? "#424242" : "white"};
              `}
            >
              회원가입
            </E_caption>
          </NavLink>
          <img src={isScroll ? Alarm : WhiteAlarm} alt="" />
        </div>
      </div>
    </header>
  );
}
