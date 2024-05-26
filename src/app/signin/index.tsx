import Input from "@/components/common/Input.tsx";
import mail from "@/assets/mail.svg";
import lock from "@/assets/lock.svg";
import kakao from "@/assets/kakao.svg";
import google from "@/assets/google.svg";
import ContainerToCenter from "@/components/common/ContainerToCenter.tsx";
import Button from "@/components/common/Button.tsx";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Logo from "@/assets/logo.png";
import SplitLine from "@/components/common/SplitLine.tsx";

export default function SignIn() {
  return (
    <ContainerToCenter>
      {/*  입력 창 섹션 */}
      <img
        src={Logo}
        alt="로고 이미지"
        css={css`
          width: 17.1rem;
          height: auto;
          margin: 0 auto;
          margin-bottom: 5.3rem;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 3.8rem;
        `}
      >
        <Input icon={mail} placeholder={`이메일을 입력해주세요`} />
        <Input
          type="password"
          icon={lock}
          placeholder={`비밀번호를 입력해주세요`}
        />
      </div>
      <Button
        css={css`
          margin-top: 5.6rem;
        `}
      >
        로그인
      </Button>
      <Link
        to={"/signup"}
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1.5rem;
        `}
      >
        회원가입
      </Link>

      {/*  소셜 로그인 섹션 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <SplitLine
          text={"소셜 계정으로 로그인"}
          css={css`
            margin-top: 4.5rem;
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.8rem;
            margin: 0;
            margin-top: 3rem;
          `}
        >
          <Button
            icon={kakao}
            css={css`
              background: #fede35;
              color: #3c1e1e;
            `}
          >
            카카오 로그인
          </Button>
          <Button
            icon={google}
            css={css`
              background: #eeeeee;
              color: #3c1e1e;
            `}
          >
            구글 로그인
          </Button>
        </div>
      </div>
    </ContainerToCenter>
  );
}
