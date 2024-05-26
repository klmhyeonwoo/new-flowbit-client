import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import expand from "@/assets/modal/board/expand.svg";
import quit from "@/assets/modal/board/quit.svg";
import CategoryIcon from "@/assets/modal/board/category.svg?react";
import ImageIcon from "@/assets/modal/board/image.svg?react";
import TagInput from "@/components/common/tag-input.tsx";
import CategoryList from "@/components/common/category-list.tsx";

interface modalProps {
  setModalState: Dispatch<SetStateAction<boolean>>;
}

export const ModalPortal = ({ children }: PropsWithChildren) => {
  const el = document.getElementById("modal");
  return createPortal(children, el as HTMLElement);
};

export function BoardModal({ setModalState }: modalProps) {
  const [isExpand, setExpand] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [category, setCategory] = useState("");
  const CATEGORY = ["도지코인", "비트코인", "이더리움"];

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: 0.3s all;
        background: ${isExpand
          ? DESIGN_SYSTEM_COLOR.GRAY_50
          : "rgba(0, 0, 0, 0.5)"};
        color: black;

        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      `}
    >
      <div
        css={css`
          z-index: 10001;
          position: relative;
        `}
      >
        <div
          css={css`
            position: relative;
            background-color: ${DESIGN_SYSTEM_COLOR.GRAY_50};
            transition: 0.4s all;
            width: 51rem;
            height: ${isExpand ? "100vh" : "41.5rem"};
            border-radius: 1rem;
          `}
          id="modal-container"
        >
          <div
            css={css`
              position: absolute;
              top: -1rem;
              right: -1.3rem;
              cursor: pointer;
              z-index: 10002;

              display: ${isExpand ? "none" : "flex"};
            `}
            onClick={() => setModalState(false)}
          >
            <img src={quit} />
          </div>
          <div
            id="title-section"
            css={css`
              border: solid 0.1rem ${DESIGN_SYSTEM_COLOR.GRAY_200};
              border-top: 0;
              border-left: 0;
              border-right: 0;
              height: 6rem;

              position: relative;
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: center;

              span {
                ${DESIGN_SYSTEM_TEXT.S2}
                font-color: ${DESIGN_SYSTEM_COLOR.GRAY_700};
              }

              img {
                position: absolute;
                right: 0;
                margin-right: 2.4rem;
                cursor: pointer;
              }
            `}
          >
            <span>새 게시물 생성</span>
            <img src={expand} onClick={() => setExpand(!isExpand)} />
          </div>
          <div
            id="content-section"
            css={css`
              height: 80%;
              padding: 2rem 3.25rem;
              display: flex;
              flex-direction: column;
            `}
          >
            <textarea
              id="title"
              placeholder="아티클의 제목을 입력해주세요"
              css={css`
                ${DESIGN_SYSTEM_TEXT.T4}
                width: 100%;
                border: none;
                resize: none;
                background: transparent;
                color: ${DESIGN_SYSTEM_COLOR.GRAY_900};

                &:focus {
                  outline: none;
                }
              `}
            />
            <div
              id="content"
              contentEditable={true}
              css={css`
                ${DESIGN_SYSTEM_TEXT.S3};
                color: ${DESIGN_SYSTEM_COLOR.GRAY_700};
                min-height: 16.4rem;
                max-height: ${isExpand ? "100vh" : "16.4rem"};
                overflow-y: auto;
                z-index: 10005;
              `}
            ></div>
          </div>
          <div
            id="bottom-section"
            css={css`
              position: absolute;
              width: 100%;
              bottom: 0;
              padding: 0 3rem 0 3rem;

              display: flex;
              flex-direction: column;
            `}
          >
            <TagInput placeholder={"#태그입력"} />
            <div
              css={css`
                width: 100%;
                bottom: 0;
                padding: 1.7rem 0;
                ${DESIGN_SYSTEM_TEXT.B2_BOLD};
                color: ${DESIGN_SYSTEM_COLOR.GRAY_400};
                background: ${DESIGN_SYSTEM_COLOR.GRAY_50};
                display: flex;
                column-gap: 2rem;

                div {
                  display: flex;
                  align-items: center;
                  column-gap: 1.4rem;
                  cursor: pointer;
                }

                div:hover {
                  color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};

                  svg > path {
                    fill: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
                    stroke: white;
                  }

                  svg > circle {
                    stroke: white;
                  }
                }
              `}
            >
              <div
                css={css`
                  position: relative;
                `}
                onMouseOver={() => setSelect(true)}
              >
                <CategoryIcon />
                <span>{category || "카테고리"}</span>
                {isSelect && (
                  <CategoryList
                    list={CATEGORY}
                    setCategory={setCategory}
                    setSelect={() => setSelect(false)}
                  />
                )}
              </div>
              <div onClick={() => alert("현재 준비중인 기능이에요!")}>
                <ImageIcon />
                <span>이미지</span>
              </div>
              <button
                css={css`
                  width: 6.6rem;
                  height: 3.2rem;
                  border-radius: 10rem;
                  border: none;
                  background-color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
                  color: white;
                  margin-left: auto;
                `}
              >
                업로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
