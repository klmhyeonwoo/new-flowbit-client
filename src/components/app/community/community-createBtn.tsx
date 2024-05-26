import { css } from "@emotion/react";
import Profile from "@/assets/Profile.png";
import PencileIcon from "@/assets/PencileIcon.svg";
import B2 from "@/components/common/text/B2";

export default function CommunityCreateBtn() {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 2.4rem;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      `}
    >
      {/* Profile */}
      <img
        css={css`
          width: 5.5rem;
          height: 5.5rem;
        `}
        src={Profile}
      />
      {/* Btn */}
      <div
        css={css`
          width: 100%;
          height: 4.2rem;

          display: flex;
          gap: 1rem;
          align-items: center;
          padding: 0 2.6rem;

          background-color: #fafafa;
          border: 0.1rem solid #f5f5f5;
          border-radius: 10rem;

          cursor: pointer;
          &:hover {
            border: 0.1rem solid #0056ca;
            background-color: white;
          }
        `}
      >
        <img
          css={css`
            width: 2.4rem;
            height: 2.4rem;
          `}
          src={PencileIcon}
          alt=""
        />
        <B2
          css={css`
            color: #bdbdbd;
          `}
        >
          생성하고 싶은 게시글을 공유해주세요
        </B2>
      </div>
    </div>
  );
}
