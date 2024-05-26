import { css } from "@emotion/react";
import ContainerToCenter from "@/components/common/ContainerToCenter.tsx";
import Logo from "@/assets/logo.png";
import Input from "@/components/common/Input.tsx";
import mail from "@/assets/mail.svg";
import lock from "@/assets/lock.svg";
import Button from "@/components/common/Button.tsx";
import SplitLine from "@/components/common/SplitLine.tsx";
import kakao from "@/assets/kakao.svg";
import google from "@/assets/google.svg";
import CertificateBox from "@/components/app/signup/certificate-box.tsx";
import Eyes from "@/assets/eye.svg";

export default function SignUp() {
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

          div {
            position: relative;

            div:nth-of-type(2) {
              position: absolute;
              top: 50%;
              left: 95%;
              transform: translate(-95%, -50%);
              display: flex;
              justify-content: flex-end;
            }
          }
        `}
      >
        <div>
          <Input icon={mail} placeholder={`이메일을 입력해주세요`} />
          <CertificateBox>인증번호 요청</CertificateBox>
        </div>
        <div>
          <Input type="password" placeholder={`인증번호를 입력하세요`} />
          <CertificateBox>인증하기</CertificateBox>
        </div>
        <div>
          <Input
            type="password"
            icon={lock}
            placeholder={`비밀번호를 입력해주세요 (영문 숫자, 6-17자)`}
          />
          <CertificateBox icon={Eyes} />
        </div>
        <div>
          <Input type="password" icon={lock} placeholder={`비밀번호 확인`} />
          <CertificateBox icon={Eyes} />
        </div>
        <Input type="password" placeholder={`닉네임을 입력하세요`} />
      </div>
      <Button
        css={css`
          margin-top: 3.9rem;
        `}
      >
        가입하기
      </Button>

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
            margin-top: 3.2rem;
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
            카카오로 빠른 회원가입
          </Button>
          <Button
            icon={google}
            css={css`
              background: #eeeeee;
              color: #3c1e1e;
            `}
          >
            구글로 빠른 회원가입
          </Button>
        </div>
      </div>
    </ContainerToCenter>
  );
}
