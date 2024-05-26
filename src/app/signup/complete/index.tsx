import Logo from "@/assets/logo.png";
import { css } from "@emotion/react";
import Button from "@/components/common/Button.tsx";
import ContainerToCenter from "@/components/common/ContainerToCenter.tsx";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import FireCracker from "@/assets/firecracker.svg?react";

export default function Complete() {
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
          align-items: center;
          row-gap: 1.5rem;
        `}
      >
        <FireCracker />
        <div
          css={css`
            ${DESIGN_SYSTEM_TEXT.E4}
            color: ${DESIGN_SYSTEM_COLOR.GRAY_900};
          `}
        >
          회원가입을 축하합니다.
        </div>
        <div
          css={css`
            ${DESIGN_SYSTEM_TEXT.B1}
            color: ${DESIGN_SYSTEM_COLOR.GRAY_900};
            display: flex;
            flex-direction: column;
            text-align: center;
          `}
        >
          <span>홍길동님의 회원가입이</span>
          <span>성공적으로 완료되었습니다.</span>
        </div>
        <div
          css={css`
            width: 100%;
            height: 0.1rem;
            background-color: ${DESIGN_SYSTEM_COLOR.GRAY_200};
            margin-top: 4.7rem;
            margin-bottom: 11rem;
          `}
        ></div>
        <div
          css={css`
            display: flex;
            column-gap: 3.1rem;
            width: 100%;
          `}
        >
          <Button
            css={css`
              background-color: ${DESIGN_SYSTEM_COLOR.BLUE_GRAY_50};
              color: ${DESIGN_SYSTEM_COLOR.GRAY_400};
            `}
          >
            홈으로
          </Button>
          <Button>로그인</Button>
        </div>
      </div>
    </ContainerToCenter>
  );
}
