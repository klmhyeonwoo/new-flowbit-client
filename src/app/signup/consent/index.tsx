import ContainerToCenter from "@/components/common/ContainerToCenter.tsx";
import Logo from "@/assets/logo.png";
import { css } from "@emotion/react";
import TextWithCheckBox from "@/components/app/signup/consent/text-with-checkbox.tsx";
import Textarea from "@/components/app/signup/consent/textarea.tsx";
import Button from "@/components/common/Button.tsx";

export default function Consent() {
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
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 2.3rem;
          `}
        >
          <TextWithCheckBox text="플로우빗 이용약관" checked={false} />
          <Textarea>
            플로우빗 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
            본 약관은 다양한 플로우빗 서비스의 이용과 관련하여 이를 이용하는
            서비스 회원(이하 ‘회원’)과의 관계를 설명하며, 아울러 여러분의
            플로우빗 서비스 이용에 도움이 될 수 있는 유익한 정보를 플로우빗
            서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은
            다양한 플로우빗 서비스의 이용과 관련하여 이를 이용하는 서비스
            회원(이하 ‘회원’)과의 관계를 설명하며, 아울러 여러분의 플로우빗
            서비스 이용에 도움이 될 수 있는 유익한 정보를
          </Textarea>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 2.3rem;
          `}
        >
          <TextWithCheckBox text="개인정보 수집 및 이용" checked={false} />
          <Textarea>
            플로우빗 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
            본 약관은 다양한 플로우빗 서비스의 이용과 관련하여 이를 이용하는
            서비스 회원(이하 ‘회원’)과의 관계를 설명하며, 아울러 여러분의
            플로우빗 서비스 이용에 도움이 될 수 있는 유익한 정보를 플로우빗
            서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은
            다양한 플로우빗 서비스의 이용과 관련하여 이를 이용하는 서비스
            회원(이하 ‘회원’)과의 관계를 설명하며, 아울러 여러분의 플로우빗
            서비스 이용에 도움이 될 수 있는 유익한 정보를
          </Textarea>
        </div>
        <Button
          css={css`
            margin-top: 1.6rem;
          `}
        >
          다음
        </Button>
      </div>
    </ContainerToCenter>
  );
}
