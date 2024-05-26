import { useState } from "react";
import { css } from "@emotion/react";
import Fire from "@/assets/Fire.png";
import UseApiCommunity, {
  ApiCommunityProps,
} from "@/hooks/api/newsletter/UseApiComminity";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable";

const TAB_LIST = ["실시간", "주간", "댓글순"];
const TAB_DICT: { [key: string]: string } = {
  실시간: "&Sort=boardLikeCount,desc",
  주간: "&setDataForPastWeeks=1",
  댓글순: "&Sort=boardCommentCount,desc",
};

export default function CommunityHotBoard() {
  const [communityProps, setCommunityProps] = useState<ApiCommunityProps>({
    page: `page=0`,
    size: `&size=5`,
    sort: "&Sort=boardLikeCount,desc",
    category: "",
    searchWord: "",
  });
  const { data } = UseApiCommunity(communityProps);

  const [curTab, setCurTab] = useState(TAB_LIST[0]);

  const handleChangeTab = (tab: string) => {
    setCurTab(tab);

    setCommunityProps({
      ...communityProps,
      sort: TAB_DICT[tab],
    });
  };

  return (
    <aside
      css={css`
        display: block;
        width: 26rem;
      `}
    >
      {/* Title */}
      <header
        css={css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.7rem;
        `}
      >
        <img
          css={css`
            width: 2.4rem;
            height: 2.4rem;
          `}
          src={Fire}
          alt="커서 이미지"
        />
        <span
          css={css`
            ${DESIGN_SYSTEM_TEXT.S1}
          `}
        >
          가장 많이 읽은 글
        </span>
      </header>
      {/* Layout */}
      <div
        css={css`
          padding: 2rem 1.8rem;
          border: 0.1rem solid ${DESIGN_SYSTEM_COLOR.GRAY_200};
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-radius: 0.5rem;
        `}
      >
        {/* tab */}
        <nav
          css={css`
            margin-bottom: 1.6rem;
          `}
        >
          <ul
            css={css`
              display: flex;
              align-items: center;
              list-style: none;
              padding: 0;
              margin: 0;
              gap: 1rem;

              & > li {
                padding: 0.5rem 1.5rem;
                cursor: pointer;
              }

              & > li.selected {
                border-radius: 10rem;
                background-color: ${DESIGN_SYSTEM_COLOR.BRAND_BLUE};
              }

              & > li.selected span {
                font-weight: bold;
                color: ${DESIGN_SYSTEM_COLOR.GRAY_50};
              }
            `}
          >
            {TAB_LIST.map((tab) => (
              <li
                key={"tag" + tab}
                onClick={() => handleChangeTab(tab)}
                className={tab === curTab ? "selected" : ""}
              >
                <span
                  css={css`
                    ${DESIGN_SYSTEM_TEXT.B2}
                    color: ${DESIGN_SYSTEM_COLOR.GRAY_600};
                  `}
                >
                  {tab}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        {/* list */}
        <div>
          <ul
            css={css`
              list-style: none;
              padding: 0;
              margin: 0;
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            `}
          >
            {data &&
              data.content.map((row, index) => {
                return (
                  <li
                    key={"hotBoard" + row.boardId}
                    css={css`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        gap: 0.8rem;
                      `}
                    >
                      <span
                        css={css`
                          ${DESIGN_SYSTEM_TEXT.B1_BOLD}
                          color: ${DESIGN_SYSTEM_COLOR.GRAY_900};
                        `}
                      >
                        0{index + 1}
                      </span>
                      <span
                        css={css`
                          ${DESIGN_SYSTEM_TEXT.B1}
                          color: ${DESIGN_SYSTEM_COLOR.GRAY_700};
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        `}
                      >
                        {row.title}
                      </span>
                    </div>
                    <span
                      css={css`
                        ${DESIGN_SYSTEM_TEXT.B1}
                        color: ${DESIGN_SYSTEM_COLOR.RED_500};
                      `}
                    >
                      {row.comments.length ? `(${row.comments.length})` : ""}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
